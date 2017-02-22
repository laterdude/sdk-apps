import React from 'react';
import ReactDOM from 'react-dom';
import ol from 'openlayers';
import {addLocaleData, IntlProvider} from 'react-intl';
import MapPanel from 'boundless-sdk/components/MapPanel';
import HomeButton from 'boundless-sdk/components/HomeButton';
import Zoom from 'boundless-sdk/components/Zoom';
import LayerList from 'boundless-sdk/components/LayerList';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Measure from 'boundless-sdk/components/Measure';
import enLocaleData from 'react-intl/locale-data/en';
import enMessages from 'boundless-sdk/locale/en';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

addLocaleData(
  enLocaleData
);

var map = new ol.Map({
  controls: [new ol.control.Attribution({collapsible: false})],
  layers: [
    new ol.layer.Group({
      type: 'base-group',
      title: 'Base maps',
      layers: [
        new ol.layer.Tile({
          type: 'base',
          title: 'Streets',
          source: new ol.source.OSM()
        }),
        new ol.layer.Tile({
          type: 'base',
          title: 'Satellite',
          visible: false,
          source: new ol.source.XYZ({
            attributions: [
              new ol.Attribution({
                html: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              })
            ],
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          })
        })
      ]
    })
  ],
  view: new ol.View({
    center: [-10764594.758211, 4523072.3184791],
    zoom: 3
  })
});

class MyApp extends React.Component {
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }
  render() {
    return (
      <div id='content'>
        <AppBar iconElementLeft={<img style={{marginTop: '10px'}} src="resources/logo.svg" width="30" height="30" />} title="Map Layers">
          <Measure style={{marginTop: '10px'}} map={map} />
        </AppBar>
        <MapPanel id='map' map={map} useHistory={false}/>
        <div><LayerList showOnStart={true} showZoomTo={true} allowReordering={true} addLayer={{sources: [{url: '/geoserver/wms', type: 'WMS', title: 'Local GeoServer'}]}} expandOnHover={false} map={map} /></div>
        <div id='home-button'><HomeButton map={map} /></div>
        <div id='zoom-buttons'><Zoom map={map} /></div>
      </div>
    );
  }
}

MyApp.childContextTypes = {
  muiTheme: React.PropTypes.object
};

ReactDOM.render(<IntlProvider locale='en' messages={enMessages}><MyApp /></IntlProvider>, document.getElementById('main'));
