import {
  OnInit,
  Component,
  Inject,
  NgZone,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Store } from '@ngxs/store';
import { RequestDataState } from 'src/app/store/request-data.state';

import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { CitiesModel } from "src/app/models/cities.model";

export type DestinationPopular = {
  origin: string;
  destination: string;
  departure_at: Date;
  return_at: Date;
  expires_at: Date;
  number_of_changes: number;
  price: number;
  found_at: Date;
  transfers: number;
  airline: string;
  flight_number: number;
};

export type GetDestinationPopular = {
  success: boolean;
  data: Map<string, DestinationPopular>;
  currency: string;
};

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  button: any;
  private root!: am5.Root;
  items: GetDestinationPopular[] = [];
  originPointCode: string = '';
  originLat: string;
  originLon: string;
  originCode: string = '';
  objValues: any;
  matchedOriginCity: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone,
    private flightInfoService: FlightsInfoService,
    private store: Store
  ) {
  }

  getCityByCode(cityCode: string): CitiesModel {
    const cities = this.store.selectSnapshot(RequestDataState.cities);
    const matchedCity = cities.find((city: CitiesModel) => city.code === cityCode)
    return matchedCity
  }

  ngOnInit(): void {
    const origin = 'LWO';
    this.flightInfoService
      .requestPopularDestination(origin)
      .subscribe((res: GetDestinationPopular) => {
        const test: Map<string, DestinationPopular> = res.data;
        const objValues: DestinationPopular[] = Object.values(test);
        objValues.forEach((obj: DestinationPopular) => {
          const matchedCity = this.getCityByCode(obj.destination);
          Object.assign(obj, {
            id: matchedCity ? matchedCity.name.toLowerCase() : '',
            title: matchedCity ? matchedCity.name : '',
            geometry: {
              type: 'Point',
              coordinates: matchedCity ? [matchedCity.coordinates.lon, matchedCity.coordinates.lat] : []
            },
          })
        })

        this.makeChart(objValues);
      });
    
    const citiesArr = this.store.selectSnapshot(RequestDataState.cities);
    const asd = citiesArr.filter(item => item.code === 'LWO');

    this.originLat = asd[0].coordinates.lat;
    this.originLon = asd[0].coordinates.lon;
    this.originCode = asd[0].code;
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  makeChart(objValues: any): void {
    this.browserOnly(() => {
      let root = am5.Root.new('chartdiv');
      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: 'translateX',
          panY: 'translateY',
          projection: am5map.geoMercator(),
        })
      );

      let cont = chart.children.push(
        am5.Container.new(root, {
          layout: root.horizontalLayout,
          x: 20,
          y: 40,
        })
      );

      chart.set('projection', am5map.geoMercator());
      chart.set('panX', 'translateX');
      chart.set('panY', 'translateY');

      let polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow,
        })
      );

      let graticuleSeries = chart.series.push(
        am5map.GraticuleSeries.new(root, {})
      );
      graticuleSeries.mapLines.template.setAll({
        stroke: root.interfaceColors.get('alternativeBackground'),
        strokeOpacity: 0.08,
      });

      let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
      lineSeries.mapLines.template.setAll({
        stroke: root.interfaceColors.get('alternativeBackground'),
        strokeOpacity: 0.6,
      });

      let citySeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

      citySeries.bullets.push(function () {
        let circle = am5.Circle.new(root, {
          radius: 5,
          tooltipText: '{title}',
          tooltipY: 0,
          fill: am5.color(0xffba00),
          stroke: root.interfaceColors.get('background'),
          strokeWidth: 2,
        });

        return am5.Bullet.new(root, {
          sprite: circle,
        });
      });

      let arrowSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

      arrowSeries.bullets.push(function () {
        let arrow = am5.Graphics.new(root, {
          fill: am5.color(0x000000),
          stroke: am5.color(0x000000),
          draw: function (display: any) {
            display.moveTo(0, -3);
            display.lineTo(8, 0);
            display.lineTo(0, 3);
            display.lineTo(0, -3);
          },
        });

        return am5.Bullet.new(root, {
          sprite: arrow,
        });
      });

      let cities = [
        {
          id: 'lviv',
          title: 'Lviv',
          geometry: { type: 'Point', coordinates: [23.955318, 49.816418] },
        },
        ...objValues,
      ];

      const arrOfId = objValues.map((item: any) => {
        let array = [];
        const id = item.id;
        array.push(id);
        return array
      })

      citySeries.data.setAll(cities);

      let destinations = [
        ...arrOfId,
      ];
      let originLongitude = this.originLon.toString();
      let originLatitude = this.originLat.toString();

      am5.array.each(destinations, function (did: string) {
        let destinationDataItem: any = citySeries.getDataItemById(did);
        let lineDataItem = lineSeries.pushDataItem({
          geometry: {
            type: 'LineString',
            coordinates: [
              [originLongitude, originLatitude],
              [
                destinationDataItem.get('longitude'),
                destinationDataItem.get('latitude'),
              ],
            ],
          },
        });

        arrowSeries.pushDataItem({
          lineDataItem: lineDataItem,
          positionOnLine: 0.5,
          autoRotate: true,
        });
      });

      polygonSeries.events.on('datavalidated', function () {
        chart.zoomToGeoPoint({ longitude: -0.1262, latitude: 51.5002 }, 3);
      });

      chart.appear(1000, 100);
    });
  }
}
