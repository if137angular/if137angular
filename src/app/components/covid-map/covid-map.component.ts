import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngxs/store';
import { RequestDataState } from 'src/app/store/request-data.state';

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am4themes from "@amcharts/amcharts4/themes/animated";
import am4geodata from "@amcharts/amcharts5-geodata/data/countries2";


@Component({
  selector: 'app-covid-map',
  templateUrl: './covid-map.component.html',
  styleUrls: ['./covid-map.component.scss']
})
export class CovidMapComponent {
  id: string = "UA"

  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone , private store: Store) { }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      // const coutriesArr = this.store.selectSnapshot(RequestDataState.cities);
  

        let groupData = [
          {
            "name": "High level of desease",
            "data": [
              { "id": "AT", "joined": "1995" },
              { "id": "IE", "joined": "1973" },
              { "id": "DK", "joined": "1973" },
              { "id": "FI", "joined": "1995" },
              { "id": "SE", "joined": "1995" },
              { "id": "GB", "joined": "1973" },
              { "id": "IT", "joined": "1957" },
              { "id": "FR", "joined": "1957" },
              { "id": "ES", "joined": "1986" },
              { "id": "GR", "joined": "1981" },
              { "id": "DE", "joined": "1957" },
              { "id": "BE", "joined": "1957" },
              { "id": "LU", "joined": "1957" },
              { "id": "NL", "joined": "1957" },
              { "id": "PT", "joined": "1986" },
              { "id": this.id, "joined": "1986" }
            ]
          }, {
            "name": "Medium level ",
            "data": [
              { "id": "LT", "joined": "2004" },
              { "id": "LV", "joined": "2004" },
              { "id": "CZ", "joined": "2004" },
              { "id": "SK", "joined": "2004" },
              { "id": "SI", "joined": "2004" },
              { "id": "EE", "joined": "2004" },
              { "id": "HU", "joined": "2004" },
              { "id": "CY", "joined": "2004" },
              { "id": "MT", "joined": "2004" },
              { "id": "PL", "joined": "2004" }
            ]
          }, {
            "name": "Low",
            "data": [
              { "id": "RO", "joined": "2007" },
              { "id": "BG", "joined": "2007" },
              { "id": "RU", "joined": "2007" }
            ]
          }, {
            "name": "null",
            "data": [
              { "id": "HR", "joined": "2013" }
            ]
          }
        ];


      // Create root and chart
      let root = am5.Root.new("chartdiv");


      // Set themes
      root.setThemes([
        am5themes_Animated.new(root)
      ]);


      // Create chart
      let chart = root.container.children.push(am5map.MapChart.new(root, {
        homeZoomLevel: 3.5,
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
          tooltipText: "[bold]{name}[/]\nMember since {joined}",
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

