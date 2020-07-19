import React, {  createRef, Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


 class MapView extends Component {

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(pos => {
            this.setState({
                center: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
            })
        })
    }
    state = {
      center: {
        lat: 51.505,
        lng: -0.09,
      },
      marker: {
        lat: 51.505,
        lng: -0.09,
        
      },
      markerLocation : '',
      zoom: 18,
      
    }
    

    refmarker = createRef()
  
    
  
    updatePosition = () => {
      const marker = this.refmarker.current
      if (marker != null) {
        this.setState({
          marker: marker.leafletElement.getLatLng(),
        })
      }
    }

    setPosition = e => {

        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
        .then(e => e.json())
        .then(({ name }) => {

            this.setState({
                marker : e.latlng,
                markerLocation : name
            })
                
        })
        
    }
  
    render() {
      const position = [this.state.center.lat, this.state.center.lng]
      const markerPosition = [this.state.marker.lat, this.state.marker.lng]
  
      return (
        <Map center={position} zoom={this.state.zoom} onclick={this.setPosition}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            draggable={true}
            onDragend={this.updatePosition}
            position={markerPosition}
            ref={this.refmarker}>
            <Popup minWidth={90}>
             
               {this.state.markerLocation}
              
            </Popup>
          </Marker>
        </Map>
      )
    }
}

export default MapView;
