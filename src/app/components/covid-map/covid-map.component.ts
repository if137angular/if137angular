import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { Store } from '@ngxs/store';
import { RequestDataState } from 'src/app/store/request-data.state';
import { CitiesModel } from 'src/app/models/cities.model';

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am4themes from "@amcharts/amcharts4/themes/animated";
import am4geodata from "@amcharts/amcharts5-geodata/data/countries2";
import { CovidData } from 'src/app/models/covid-map.model';


@Component({
  selector: 'app-covid-map',
  templateUrl: './covid-map.component.html',
  styleUrls: ['./covid-map.component.scss']
})
export class CovidMapComponent implements OnInit {
  dataLow: CovidData[] = [];
  dataMedium: CovidData[];
  dataHigh: CovidData[];
  constructor(@Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone,
    private flightInfoService: FlightsInfoService,
    private store: Store
  ) { }

  ngOnInit() {
    this.flightInfoService.getCovidStatistic().subscribe(data => {
      const countries = this.getCountriesWithCode(data.response)
      const covidInfo = countries.map((element: CovidData) => Object.assign(element, {
        id: this.store.selectSnapshot(RequestDataState.countries)
          .find((country: CitiesModel) => country.name === element.country).code,
        covidLevel: this.getCovidLevel(element)
      }));

      this.dataLow = covidInfo.filter((element: CovidData) => element.covidLevel === "low");
      this.dataMedium = covidInfo.filter((element: CovidData) => element.covidLevel === "medium");
      this.dataHigh = covidInfo.filter((element: CovidData) => element.covidLevel === "high");

      this.createMap(this.dataLow, this.dataMedium, this.dataHigh)

    })
  }

  getCovidLevel(element: CovidData): string {
    const percent = element.cases.total * 100 / element.population;
    if (percent > 0.05 && percent < 0.2) {
      return "low";
    } else if (percent > 0.2 && percent < 0.8) {
      return "medium";
    } else {
      return "high";
    }

  }

  getCountriesWithCode(arr: CovidData[]) {
    const covid = arr.map((element: CovidData) => this.store.selectSnapshot(RequestDataState.countries)
      .find((country: CitiesModel) => country.name === element.country))
    const countries: CovidData[] = [];
    for (let i = 0; i < arr.length; i++) {
      if (covid[i] !== undefined) {
        countries.push(arr[i]);
      }
    }
    return countries;
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  createMap(dataLow: CovidData[], dataMedium: CovidData[], dataHigh: CovidData[]) {
    this.browserOnly(() => {

      let groupData = [
        {
          "name": "High level of disease",
          "data": []
        }, {
          "name": "Medium level of disease ",
          "data": []
        }, {
          "name": "Low level of disease",
          "data": [{ "id": "" , "joined": 0 }]
        },
        {
          "name": "Окупанти",
          "data": [{ "id": "RU" , "joined": 0 }]
        },
      ];

      const arr = () => {
        for (let item of this.dataLow) {
          groupData[2].data.unshift({ id: item.id, joined: item.cases.total })
        }
        for (let item of this.dataMedium) {
          groupData[1].data.unshift({ id: item.id, joined: item.cases.total })
        }
        for (let item of this.dataHigh) {
          groupData[0].data.unshift({ id: item.id, joined: item.cases.total })
        }
      }
      arr()

      // Create root and chart
      let root = am5.Root.new("mapdiv");


      // Set themes
      root.setThemes([
        am5themes_Animated.new(root)
      ]);


      // Create chart
      let chart = root.container.children.push(am5map.MapChart.new(root, {
        homeZoomLevel: 1,
        homeGeoPoint: { longitude: 10, latitude: 52 }
      }));


      // Create world polygon series
      let worldSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"]
      }));

      worldSeries.mapPolygons.template.setAll({
        fill: am5.color(0xaaaaaa)
      });

      worldSeries.events.on("datavalidated", () => {
        chart.goHome();
      });


      // Add legend
      let legend = chart.children.push(am5.Legend.new(root, {
        useDefaultMarker: true,
        centerX: am5.p50,
        x: am5.p50,
        centerY: am5.p100,
        y: am5.p100,
        dy: -20,
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xffffff),
          fillOpacity: 0.2
        })
      }));

      legend.valueLabels.template.set("forceHidden", true)


      // Create series for each group
      let colors = am5.ColorSet.new(root, {
        step: 2
      });
      colors.next();

      am5.array.each(groupData, function (group) {
        let countries: any = [];
        let color = colors.next();

        am5.array.each(group.data, function (country) {
          countries.push(country.id)
        });

        let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow,
          include: countries,
          name: group.name,
          fill: color
        }));


        polygonSeries.mapPolygons.template.setAll({
          tooltipText: "[bold]{name}[/]\ntotal cases {joined}",
          interactive: true,
          fill: color,
          strokeWidth: 2
        });

        polygonSeries.mapPolygons.template.states.create("hover", {
          fill: am5.Color.brighten(color, -0.3)
        });

        polygonSeries.mapPolygons.template.events.on("pointerover", function (ev: any) {
          ev.target.series.mapPolygons.each(function (polygon: any) {
            polygon.states.applyAnimate("hover");
          });
        });

        polygonSeries.mapPolygons.template.events.on("pointerout", function (ev: any) {
          ev.target.series.mapPolygons.each(function (polygon: any) {
            polygon.states.applyAnimate("default");
          });
        });
        polygonSeries.data.setAll(group.data);

        legend.data.push(polygonSeries);
      });



    })
  }

}

