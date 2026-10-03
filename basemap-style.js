// Custom OpenFreeMap / OpenMapTiles style. Leaflet zoom = GL zoom + 1.
window.TRIP_BASEMAP_STYLE = {
  "version": 8,
  "name": "Travel minimal basemap",
  "metadata": {
    "sourceStyle": "https://tiles.openfreemap.org/styles/liberty",
    "minorRoadLeafletZoom": 16,
    "preferences": "Muted water and greenery, selected main road / large water / park names, sparse important place names. Other POI, rail, stations, buildings and boundaries remain hidden."
  },
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "url": "https://tiles.openfreemap.org/planet"
    }
  },
  "glyphs": "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "#f7f8f4"
      }
    },
    {
      "id": "park",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "park",
      "paint": {
        "fill-color": "#eaf0e4",
        "fill-opacity": 0.55
      }
    },
    {
      "id": "landcover_wood",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "filter": [
        "==",
        [
          "get",
          "class"
        ],
        "wood"
      ],
      "paint": {
        "fill-color": "#eaf0e4",
        "fill-opacity": 0.55
      }
    },
    {
      "id": "landcover_grass",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "filter": [
        "==",
        [
          "get",
          "class"
        ],
        "grass"
      ],
      "paint": {
        "fill-color": "#eaf0e4",
        "fill-opacity": 0.55
      }
    },
    {
      "id": "landcover_wetland",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "minzoom": 12,
      "filter": [
        "==",
        [
          "get",
          "class"
        ],
        "wetland"
      ],
      "paint": {
        "fill-color": "#eaf0e4",
        "fill-opacity": 0.55
      }
    },
    {
      "id": "waterway_tunnel",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "filter": [
        "==",
        [
          "get",
          "brunnel"
        ],
        "tunnel"
      ],
      "paint": {
        "line-color": "#dee9ec",
        "line-dasharray": [
          3,
          3
        ],
        "line-gap-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          12,
          0,
          20,
          6
        ],
        "line-opacity": 0.7,
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.4
          ],
          [
            "zoom"
          ],
          8,
          1,
          20,
          2
        ]
      }
    },
    {
      "id": "waterway_river",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "filter": [
        "all",
        [
          "==",
          [
            "get",
            "class"
          ],
          "river"
        ],
        [
          "!=",
          [
            "get",
            "brunnel"
          ],
          "tunnel"
        ]
      ],
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#dee9ec",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          11,
          0.5,
          20,
          6
        ],
        "line-opacity": 0.7
      }
    },
    {
      "id": "waterway_other",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "filter": [
        "all",
        [
          "!=",
          [
            "get",
            "class"
          ],
          "river"
        ],
        [
          "!=",
          [
            "get",
            "brunnel"
          ],
          "tunnel"
        ]
      ],
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#dee9ec",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.3
          ],
          [
            "zoom"
          ],
          13,
          0.5,
          20,
          6
        ],
        "line-opacity": 0.7
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "water",
      "filter": [
        "!=",
        [
          "get",
          "brunnel"
        ],
        "tunnel"
      ],
      "paint": {
        "fill-color": "#e4edef",
        "fill-opacity": 0.8
      }
    },
    {
      "id": "tunnel_motorway_link_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "class"
            ],
            "motorway"
          ],
          [
            "==",
            [
              "get",
              "ramp"
            ],
            1
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-dasharray": [
          0.5,
          0.25
        ],
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12,
          1,
          13,
          3,
          14,
          4,
          20,
          15
        ],
        "line-opacity": 0.65
      }
    },
    {
      "id": "tunnel_service_track_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "service",
              "track"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-dasharray": [
          0.5,
          0.25
        ],
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          15,
          1,
          16,
          4,
          20,
          11
        ],
        "line-opacity": 0.65
      },
      "minzoom": 15
    },
    {
      "id": "tunnel_link_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "ramp"
            ],
            1
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12,
          1,
          13,
          3,
          14,
          4,
          20,
          15
        ],
        "line-opacity": 0.65
      },
      "minzoom": 15
    },
    {
      "id": "tunnel_street_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "street",
              "street_limited"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-opacity": 0.65,
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12,
          0.5,
          13,
          1,
          14,
          4,
          20,
          15
        ]
      },
      "minzoom": 15
    },
    {
      "id": "tunnel_secondary_tertiary_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "secondary",
              "tertiary"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          8,
          1.5,
          20,
          17
        ],
        "line-opacity": 0.65
      }
    },
    {
      "id": "tunnel_trunk_primary_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "primary",
              "trunk"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          5,
          0.4,
          6,
          0.7,
          7,
          1.75,
          20,
          22
        ],
        "line-opacity": 0.65
      }
    },
    {
      "id": "tunnel_motorway_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "class"
            ],
            "motorway"
          ],
          [
            "!=",
            [
              "get",
              "ramp"
            ],
            1
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-dasharray": [
          0.5,
          0.25
        ],
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          5,
          0.4,
          6,
          0.7,
          7,
          1.75,
          20,
          22
        ],
        "line-opacity": 0.65
      }
    },
    {
      "id": "tunnel_path_pedestrian",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "geometry-type"
            ],
            [
              "LineString",
              "MultiLineString"
            ],
            true,
            false
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "path",
              "pedestrian"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "paint": {
        "line-color": "#dedfd8",
        "line-dasharray": [
          1,
          0.75
        ],
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          14,
          0.5,
          20,
          10
        ],
        "line-opacity": 0.85
      },
      "minzoom": 15
    },
    {
      "id": "tunnel_motorway_link",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "class"
            ],
            "motorway"
          ],
          [
            "==",
            [
              "get",
              "ramp"
            ],
            1
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#d1c9ba",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12.5,
          0,
          13,
          1.5,
          14,
          2.5,
          20,
          11.5
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "tunnel_service_track",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "service",
              "track"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dedfd8",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          15.5,
          0,
          16,
          2,
          20,
          7.5
        ],
        "line-opacity": 0.85
      },
      "minzoom": 15
    },
    {
      "id": "tunnel_link",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "ramp"
            ],
            1
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dedfd8",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12.5,
          0,
          13,
          1.5,
          14,
          2.5,
          20,
          11.5
        ],
        "line-opacity": 0.85
      },
      "minzoom": 15
    },
    {
      "id": "tunnel_minor",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "minor"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dedfd8",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          13.5,
          0,
          14,
          2.5,
          20,
          11.5
        ],
        "line-opacity": 0.85
      },
      "minzoom": 15
    },
    {
      "id": "tunnel_secondary_tertiary",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "secondary",
              "tertiary"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#d8d4ca",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          6.5,
          0,
          7,
          0.5,
          20,
          10
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "tunnel_trunk_primary",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "primary",
              "trunk"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#d8d4ca",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          5,
          0,
          7,
          1,
          20,
          18
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "tunnel_motorway",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "class"
            ],
            "motorway"
          ],
          [
            "!=",
            [
              "get",
              "ramp"
            ],
            1
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "tunnel"
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#d1c9ba",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          5,
          0,
          7,
          1,
          20,
          18
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "road_motorway_link_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 12,
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "==",
            [
              "get",
              "class"
            ],
            "motorway"
          ],
          [
            "==",
            [
              "get",
              "ramp"
            ],
            1
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12,
          1,
          13,
          3,
          14,
          4,
          20,
          15
        ],
        "line-opacity": 0.65
      }
    },
    {
      "id": "road_service_track_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "service",
              "track"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          15,
          1,
          16,
          4,
          20,
          11
        ],
        "line-opacity": 0.65
      },
      "minzoom": 15
    },
    {
      "id": "road_link_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 15,
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "motorway",
              "path",
              "pedestrian",
              "service",
              "track"
            ],
            false,
            true
          ],
          [
            "==",
            [
              "get",
              "ramp"
            ],
            1
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12,
          1,
          13,
          3,
          14,
          4,
          20,
          15
        ],
        "line-opacity": 0.65
      }
    },
    {
      "id": "road_minor_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "geometry-type"
            ],
            [
              "LineString",
              "MultiLineString"
            ],
            true,
            false
          ],
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "minor"
            ],
            true,
            false
          ],
          [
            "!=",
            [
              "get",
              "ramp"
            ],
            1
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-opacity": 0.65,
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12,
          0.5,
          13,
          1,
          14,
          4,
          20,
          20
        ]
      },
      "minzoom": 15
    },
    {
      "id": "road_secondary_tertiary_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "secondary",
              "tertiary"
            ],
            true,
            false
          ],
          [
            "!=",
            [
              "get",
              "ramp"
            ],
            1
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          8,
          1.5,
          20,
          17
        ],
        "line-opacity": 0.65
      }
    },
    {
      "id": "road_trunk_primary_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "primary",
              "trunk"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          5,
          0.4,
          6,
          0.7,
          7,
          1.75,
          20,
          22
        ],
        "line-opacity": 0.65
      }
    },
    {
      "id": "road_motorway_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 5,
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "==",
            [
              "get",
              "class"
            ],
            "motorway"
          ],
          [
            "!=",
            [
              "get",
              "ramp"
            ],
            1
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          5,
          0.4,
          6,
          0.7,
          7,
          1.75,
          20,
          22
        ],
        "line-opacity": 0.65
      }
    },
    {
      "id": "road_path_pedestrian",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 15,
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "geometry-type"
            ],
            [
              "LineString",
              "MultiLineString"
            ],
            true,
            false
          ],
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "path",
              "pedestrian"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dedfd8",
        "line-dasharray": [
          1,
          0.7
        ],
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          14,
          1,
          20,
          10
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "road_motorway_link",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 12,
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "==",
            [
              "get",
              "class"
            ],
            "motorway"
          ],
          [
            "==",
            [
              "get",
              "ramp"
            ],
            1
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#d1c9ba",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12.5,
          0,
          13,
          1.5,
          14,
          2.5,
          20,
          11.5
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "road_service_track",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "service",
              "track"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dedfd8",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          15.5,
          0,
          16,
          2,
          20,
          7.5
        ],
        "line-opacity": 0.85
      },
      "minzoom": 15
    },
    {
      "id": "road_link",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 15,
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "==",
            [
              "get",
              "ramp"
            ],
            1
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "motorway",
              "path",
              "pedestrian",
              "service",
              "track"
            ],
            false,
            true
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dedfd8",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12.5,
          0,
          13,
          1.5,
          14,
          2.5,
          20,
          11.5
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "road_minor",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "geometry-type"
            ],
            [
              "LineString",
              "MultiLineString"
            ],
            true,
            false
          ],
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "minor"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dedfd8",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          13.5,
          0,
          14,
          2.5,
          20,
          18
        ],
        "line-opacity": 0.85
      },
      "minzoom": 15
    },
    {
      "id": "road_secondary_tertiary",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "secondary",
              "tertiary"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#d8d4ca",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          6.5,
          0,
          8,
          0.5,
          20,
          13
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "road_trunk_primary",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "primary",
              "trunk"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#d8d4ca",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          5,
          0,
          7,
          1,
          20,
          18
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "road_motorway",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 5,
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "get",
              "brunnel"
            ],
            [
              "bridge",
              "tunnel"
            ],
            false,
            true
          ],
          [
            "==",
            [
              "get",
              "class"
            ],
            "motorway"
          ],
          [
            "!=",
            [
              "get",
              "ramp"
            ],
            1
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#d1c9ba",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          5,
          0,
          7,
          1,
          20,
          18
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "bridge_motorway_link_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "class"
            ],
            "motorway"
          ],
          [
            "==",
            [
              "get",
              "ramp"
            ],
            1
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12,
          1,
          13,
          3,
          14,
          4,
          20,
          15
        ],
        "line-opacity": 0.65
      }
    },
    {
      "id": "bridge_service_track_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "service",
              "track"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          15,
          1,
          16,
          4,
          20,
          11
        ],
        "line-opacity": 0.65
      },
      "minzoom": 15
    },
    {
      "id": "bridge_link_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "class"
            ],
            "link"
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12,
          1,
          13,
          3,
          14,
          4,
          20,
          15
        ],
        "line-opacity": 0.65
      },
      "minzoom": 15
    },
    {
      "id": "bridge_street_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "street",
              "street_limited"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-opacity": 0.65,
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12,
          0.5,
          13,
          1,
          14,
          4,
          20,
          25
        ]
      },
      "minzoom": 15
    },
    {
      "id": "bridge_path_pedestrian_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "geometry-type"
            ],
            [
              "LineString",
              "MultiLineString"
            ],
            true,
            false
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "path",
              "pedestrian"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "paint": {
        "line-color": "#f7f8f4",
        "line-dasharray": [
          1,
          0
        ],
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          14,
          1.5,
          20,
          18
        ],
        "line-opacity": 0.65
      },
      "minzoom": 15
    },
    {
      "id": "bridge_secondary_tertiary_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "secondary",
              "tertiary"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          8,
          1.5,
          20,
          17
        ],
        "line-opacity": 0.65
      }
    },
    {
      "id": "bridge_trunk_primary_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "primary",
              "trunk"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          5,
          0.4,
          6,
          0.7,
          7,
          1.75,
          20,
          22
        ],
        "line-opacity": 0.65
      }
    },
    {
      "id": "bridge_motorway_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "class"
            ],
            "motorway"
          ],
          [
            "!=",
            [
              "get",
              "ramp"
            ],
            1
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#f7f8f4",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          5,
          0.4,
          6,
          0.7,
          7,
          1.75,
          20,
          22
        ],
        "line-opacity": 0.65
      }
    },
    {
      "id": "bridge_path_pedestrian",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "match",
            [
              "geometry-type"
            ],
            [
              "LineString",
              "MultiLineString"
            ],
            true,
            false
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "path",
              "pedestrian"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "paint": {
        "line-color": "#dedfd8",
        "line-dasharray": [
          1,
          0.3
        ],
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          14,
          0.5,
          20,
          10
        ],
        "line-opacity": 0.85
      },
      "minzoom": 15
    },
    {
      "id": "bridge_motorway_link",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "class"
            ],
            "motorway"
          ],
          [
            "==",
            [
              "get",
              "ramp"
            ],
            1
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#d1c9ba",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12.5,
          0,
          13,
          1.5,
          14,
          2.5,
          20,
          11.5
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "bridge_service_track",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "service",
              "track"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dedfd8",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          15.5,
          0,
          16,
          2,
          20,
          7.5
        ],
        "line-opacity": 0.85
      },
      "minzoom": 15
    },
    {
      "id": "bridge_link",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "class"
            ],
            "link"
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dedfd8",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          12.5,
          0,
          13,
          1.5,
          14,
          2.5,
          20,
          11.5
        ],
        "line-opacity": 0.85
      },
      "minzoom": 15
    },
    {
      "id": "bridge_street",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "minor"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dedfd8",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          13.5,
          0,
          14,
          2.5,
          20,
          18
        ],
        "line-opacity": 0.85
      },
      "minzoom": 15
    },
    {
      "id": "bridge_secondary_tertiary",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "secondary",
              "tertiary"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#d8d4ca",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          6.5,
          0,
          7,
          0.5,
          20,
          10
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "bridge_trunk_primary",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ],
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "primary",
              "trunk"
            ],
            true,
            false
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#d8d4ca",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          5,
          0,
          7,
          1,
          20,
          18
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "bridge_motorway",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "all",
          [
            "==",
            [
              "get",
              "class"
            ],
            "motorway"
          ],
          [
            "!=",
            [
              "get",
              "ramp"
            ],
            1
          ],
          [
            "==",
            [
              "get",
              "brunnel"
            ],
            "bridge"
          ]
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "motorway",
            "trunk",
            "primary",
            "secondary",
            "tertiary",
            "minor",
            "street",
            "street_limited",
            "service",
            "track",
            "path",
            "pedestrian"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#d1c9ba",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.2
          ],
          [
            "zoom"
          ],
          5,
          0,
          7,
          1,
          20,
          18
        ],
        "line-opacity": 0.85
      }
    },
    {
      "id": "important-place-labels",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 6,
      "filter": [
        "any",
        [
          "in",
          [
            "get",
            "name"
          ],
          [
            "literal",
            [
              "Kuala Lumpur",
              "Putrajaya",
              "Melaka",
              "Malacca",
              "Bandar Melaka",
              "Bandaraya Melaka",
              "Genting Highlands",
              "Kuala Lumpur City Centre",
              "Bukit Bintang",
              "Malaysia"
            ]
          ]
        ],
        [
          "in",
          [
            "get",
            "name:en"
          ],
          [
            "literal",
            [
              "Kuala Lumpur",
              "Putrajaya",
              "Melaka",
              "Malacca",
              "Bandar Melaka",
              "Bandaraya Melaka",
              "Genting Highlands",
              "Kuala Lumpur City Centre",
              "Bukit Bintang",
              "Malaysia"
            ]
          ]
        ]
      ],
      "layout": {
        "icon-allow-overlap": true,
        "icon-image": [
          "step",
          [
            "zoom"
          ],
          "circle_11_black",
          9,
          ""
        ],
        "icon-optional": false,
        "icon-size": 0.4,
        "text-anchor": "bottom",
        "text-field": [
          "coalesce",
          [
            "get",
            "name:zh"
          ],
          [
            "get",
            "name:en"
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-max-width": 8,
        "text-offset": [
          0,
          -0.1
        ],
        "text-size": 13,
        "text-padding": 24,
        "text-allow-overlap": false
      },
      "paint": {
        "text-color": "#849087",
        "text-halo-color": "#f7f8f4",
        "text-halo-width": 1.5
      }
    },
    {
      "id": "major-road-names",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "minzoom": 12,
      "filter": [
        "match",
        [
          "get",
          "class"
        ],
        [
          "motorway",
          "trunk",
          "primary",
          "secondary"
        ],
        true,
        false
      ],
      "layout": {
        "symbol-placement": "line",
        "text-field": [
          "coalesce",
          [
            "get",
            "name:zh"
          ],
          [
            "get",
            "name:en"
          ],
          [
            "get",
            "name_en"
          ],
          [
            "get",
            "name:latin"
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-rotation-alignment": "map",
        "text-size": 11,
        "text-padding": 8,
        "text-allow-overlap": false,
        "symbol-spacing": 450
      },
      "paint": {
        "text-color": "#8b8579",
        "text-halo-color": "#f7f8f4",
        "text-halo-width": 1.5
      }
    },
    {
      "id": "major-river-names",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "minzoom": 11,
      "filter": [
        "all",
        [
          "==",
          [
            "get",
            "class"
          ],
          "river"
        ],
        [
          "match",
          [
            "geometry-type"
          ],
          [
            "LineString",
            "MultiLineString"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "symbol-spacing": 450,
        "text-field": [
          "coalesce",
          [
            "get",
            "name:zh"
          ],
          [
            "get",
            "name:en"
          ],
          [
            "get",
            "name_en"
          ],
          [
            "get",
            "name:latin"
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-letter-spacing": 0.2,
        "text-max-width": 5,
        "text-size": 11,
        "text-padding": 8,
        "text-allow-overlap": false
      },
      "paint": {
        "text-color": "#839ba2",
        "text-halo-color": "#f7f8f4",
        "text-halo-width": 1.5
      }
    },
    {
      "id": "large-water-point-names",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "filter": [
        "all",
        [
          "match",
          [
            "geometry-type"
          ],
          [
            "MultiPoint",
            "Point"
          ],
          true,
          false
        ],
        [
          "<=",
          [
            "coalesce",
            [
              "get",
              "rank"
            ],
            0
          ],
          3
        ]
      ],
      "layout": {
        "text-field": [
          "coalesce",
          [
            "get",
            "name:zh"
          ],
          [
            "get",
            "name:en"
          ],
          [
            "get",
            "name_en"
          ],
          [
            "get",
            "name:latin"
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-letter-spacing": 0.2,
        "text-max-width": 5,
        "text-size": 11,
        "text-padding": 8,
        "text-allow-overlap": false
      },
      "paint": {
        "text-color": "#839ba2",
        "text-halo-color": "#f7f8f4",
        "text-halo-width": 1.5
      },
      "minzoom": 9
    },
    {
      "id": "large-water-line-names",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "filter": [
        "all",
        [
          "match",
          [
            "geometry-type"
          ],
          [
            "LineString",
            "MultiLineString"
          ],
          true,
          false
        ],
        [
          "<=",
          [
            "coalesce",
            [
              "get",
              "rank"
            ],
            0
          ],
          3
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "symbol-spacing": 450,
        "text-field": [
          "coalesce",
          [
            "get",
            "name:zh"
          ],
          [
            "get",
            "name:en"
          ],
          [
            "get",
            "name_en"
          ],
          [
            "get",
            "name:latin"
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-letter-spacing": 0.2,
        "text-max-width": 5,
        "text-size": 11,
        "text-padding": 8,
        "text-allow-overlap": false
      },
      "paint": {
        "text-color": "#839ba2",
        "text-halo-color": "#f7f8f4",
        "text-halo-width": 1.5
      },
      "minzoom": 10
    },
    {
      "id": "large-park-names",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "park",
      "minzoom": 10,
      "filter": [
        "all",
        [
          "match",
          [
            "geometry-type"
          ],
          [
            "Point",
            "MultiPoint"
          ],
          true,
          false
        ],
        [
          "<=",
          [
            "coalesce",
            [
              "get",
              "rank"
            ],
            0
          ],
          3
        ]
      ],
      "layout": {
        "text-field": [
          "coalesce",
          [
            "get",
            "name:zh"
          ],
          [
            "get",
            "name:en"
          ],
          [
            "get",
            "name_en"
          ],
          [
            "get",
            "name:latin"
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-size": 12,
        "text-padding": 14
      },
      "paint": {
        "text-color": "#8a9a80",
        "text-halo-color": "#f7f8f4",
        "text-halo-width": 1.5
      }
    },
    {
      "id": "urban-park-names",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "poi",
      "minzoom": 12,
      "filter": [
        "all",
        [
          "any",
          [
            "==",
            [
              "get",
              "class"
            ],
            "park"
          ],
          [
            "match",
            [
              "get",
              "subclass"
            ],
            [
              "park",
              "garden",
              "nature_reserve"
            ],
            true,
            false
          ]
        ],
        [
          "<=",
          [
            "coalesce",
            [
              "get",
              "rank"
            ],
            0
          ],
          8
        ]
      ],
      "layout": {
        "text-field": [
          "coalesce",
          [
            "get",
            "name:zh"
          ],
          [
            "get",
            "name:en"
          ],
          [
            "get",
            "name_en"
          ],
          [
            "get",
            "name:latin"
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-size": 11,
        "text-padding": 14
      },
      "paint": {
        "text-color": "#8a9a80",
        "text-halo-color": "#f7f8f4",
        "text-halo-width": 1.5
      }
    }
  ]
};
