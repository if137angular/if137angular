import { OnInit, Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Select, Store } from '@ngxs/store';

import { RequestDataState } from 'src/app/store/request-data.state';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, skip } from 'rxjs';
import { GetMapData } from 'src/app/store/flight-info.action';
import { ICoordinates } from "../../models/routes-map.model";

@UntilDestroy()
@Component({
  selector: 'app-routes-map',
  templateUrl: './routes-map.component.html',
  styleUrls: ['./routes-map.component.scss'],
})
export class RoutesMapComponent implements OnInit {
  @Select(FlightInfoState.mapData)
  mapData$: Observable<any>;
  originCity: any;
  originLat: string;
  originLon: string;
  newArray: ICoordinates[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new GetMapData('LWO'));

    this.mapData$
      .pipe(
        untilDestroyed(this),
        skip(1)
      )
      .subscribe((mapData: any[]) => {
        const newArray = mapData;
        const originObj: any = this.getOrigin(newArray)
        const originLon = originObj.coordinates.lon;
        const originLat = originObj.coordinates.lat;

        this.makeChart(newArray, originObj , originLon, originLat );
      });
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  getOrigin(arr: any) {
    let obj: any;
    this.store.selectSnapshot(RequestDataState.cities).map(item => {
        if (item.code === arr[0].origin) {
          obj = item
        }
      }
    )
    return obj;
  }

  makeChart(objValues: any, originObj: any, originLon: any , originLat: any): void {
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
        strokeOpacity: 0.4,
      });

      let citySeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

      citySeries.bullets.push(function () {
        let circle = am5.Circle.new(root, {
          radius: 5,
          tooltipText: '{title}',
          tooltipY: 0,
          fill: am5.color(0xffba00),
          stroke: root.interfaceColors.get('background'),
          strokeWidth: 1,
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
          id: originObj.name.toLowerCase(),
          title: originObj.name,
          geometry: { type: 'Point', coordinates: [originLon, originLat] },
        },
          ...objValues,
      ];

      const arrOfId = objValues.map((item: any) => {
        let array = [];
        const id = item.id;
        array.push(id);
        return array;
      });

      citySeries.data.setAll(cities);

      let destinations = [...arrOfId];
      let originLongitude = originLon.toString();
      let originLatitude = originLat.toString();

      am5.array.each(destinations, function (item: string) {
        let destinationDataItem: any = citySeries.getDataItemById(item);
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
          positionOnLine: 0.7,
          autoRotate: true,
        });
      });

      polygonSeries.events.on('datavalidated', function () {
        chart.zoomToGeoPoint({ longitude: 15.1262, latitude: 55.5002 }, 7);
      });
    });
  }
}
