import { AfterViewInit, Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';


console.log(am5geodata_worldLow);

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit {
  button: any;
  private root!: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) {
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {

      //*
      let root = am5.Root.new("chartdiv");
      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      let chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator()
      }));

      let cont = chart.children.push(am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 40
      }));

      cont.children.push(am5.Label.new(root, {
        centerY: am5.p50,
        text: "Map"
      }));

      let switchButton = cont.children.push(am5.Button.new(root, {
        themeTags: ["switch"],
        centerY: am5.p50,
        icon: am5.Circle.new(root, {
          themeTags: ["icon"]
        })
      }));

      switchButton.on("active", function () {
        if (!switchButton.get("active")) {
          chart.set("projection", am5map.geoMercator());
          chart.set("panX", "translateX");
          chart.set("panY", "translateY");
        }
        else {
          chart.set("projection", am5map.geoOrthographic());
          chart.set("panX", "rotateX");
          chart.set("panY", "rotateY");
        }
      });

      cont.children.push(am5.Label.new(root, {
        centerY: am5.p50,
        text: "Globe"
      }));

      let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow
      }));

      let graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
      graticuleSeries.mapLines.template.setAll({
        stroke: root.interfaceColors.get("alternativeBackground"),
        strokeOpacity: 0.08
      });

      let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
      lineSeries.mapLines.template.setAll({
        stroke: root.interfaceColors.get("alternativeBackground"),
        strokeOpacity: 0.6
      });

      let citySeries = chart.series.push(
        am5map.MapPointSeries.new(root, {})
      );

      citySeries.bullets.push(function () {
        let circle = am5.Circle.new(root, {
          radius: 5,
          tooltipText: "{title}",
          tooltipY: 0,
          fill: am5.color(0xffba00),
          stroke: root.interfaceColors.get("background"),
          strokeWidth: 2
        });

        return am5.Bullet.new(root, {
          sprite: circle
        });
      });

      let arrowSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {})
      );

      arrowSeries.bullets.push(function () {
        let arrow = am5.Graphics.new(root, {
          fill: am5.color(0x000000),
          stroke: am5.color(0x000000),
          draw: function (display: any) {
            display.moveTo(0, -3);
            display.lineTo(8, 0);
            display.lineTo(0, 3);
            display.lineTo(0, -3);
          }
        });

        return am5.Bullet.new(root, {
          sprite: arrow
        });
      });

      let cities = [
          {
          id: "ivano-frankivsk",
          title: "Ivano-Frankivsk",
          geometry: { type: "Point", coordinates: [ 24.7097200, 48.9215000] },
        },
        {
          id: "london",
          title: "London",
          geometry: { type: "Point", coordinates: [-0.1262, 51.5002] },
        },
        {
          id: "brussels",
          title: "Brussels",
          geometry: { type: "Point", coordinates: [4.3676, 50.8371] }
        }, {
          id: "prague",
          title: "Prague",
          geometry: { type: "Point", coordinates: [14.4205, 50.0878] }
        }, {
          id: "athens",
          title: "Athens",
          geometry: { type: "Point", coordinates: [23.7166, 37.9792] }
        }, {
          id: "reykjavik",
          title: "Reykjavik",
          geometry: { type: "Point", coordinates: [-21.8952, 64.1353] }
        }, {
          id: "dublin",
          title: "Dublin",
          geometry: { type: "Point", coordinates: [-6.2675, 53.3441] }
        }, {
          id: "oslo",
          title: "Oslo",
          geometry: { type: "Point", coordinates: [10.7387, 59.9138] }
        }, {
          id: "lisbon",
          title: "Lisbon",
          geometry: { type: "Point", coordinates: [-9.1355, 38.7072] }
        }, {
          id: "moscow",
          title: "Moscow",
          geometry: { type: "Point", coordinates: [37.6176, 55.7558] }
        }, {
          id: "belgrade",
          title: "Belgrade",
          geometry: { type: "Point", coordinates: [20.4781, 44.8048] }
        }, {
          id: "bratislava",
          title: "Bratislava",
          geometry: { type: "Point", coordinates: [17.1547, 48.2116] }
        }, {
          id: "ljublana",
          title: "Ljubljana",
          geometry: { type: "Point", coordinates: [14.5060, 46.0514] }
        }, {
          id: "madrid",
          title: "Madrid",
          geometry: { type: "Point", coordinates: [-3.7033, 40.4167] }
        }, {
          id: "stockholm",
          title: "Stockholm",
          geometry: { type: "Point", coordinates: [18.0645, 59.3328] }
        }, {
          id: "bern",
          title: "Bern",
          geometry: { type: "Point", coordinates: [7.4481, 46.9480] }
        }, {
          id: "kiev",
          title: "Kiev",
          geometry: { type: "Point", coordinates: [30.5367, 50.4422] }
        }, {
          id: "paris",
          title: "Paris",
          geometry: { type: "Point", coordinates: [2.3510, 48.8567] }
        }, {
          id: "new york",
          title: "New York",
          geometry: { type: "Point", coordinates: [-74, 40.43] }
        }
      ];

      citySeries.data.setAll(cities);

  // Array destinations
      let destinations = [ "reykjavik", "lisbon", "moscow", "belgrade", "ljublana", "madrid", "stockholm", "bern", "kiev", "new york", "athens"];
      let originLongitude = 24.7097200;
      let originLatitude = 48.9215000;
      
      am5.array.each(destinations, function (did: string) {
        let destinationDataItem: any = citySeries.getDataItemById(did);
        let lineDataItem = lineSeries.pushDataItem({
          geometry: {
            type: "LineString",
            coordinates: [
              [originLongitude, originLatitude],
              [destinationDataItem.get("longitude"),
              destinationDataItem.get("latitude")]
            ]
          }
        });

        arrowSeries.pushDataItem({
          lineDataItem: lineDataItem,
          positionOnLine: 0.5,
          autoRotate: true
        });
      })

      polygonSeries.events.on("datavalidated", function () {
        chart.zoomToGeoPoint({ longitude: -0.1262, latitude: 51.5002 }, 3);
      })

      chart.appear(1000, 100);

      //*

    })
  }
}
