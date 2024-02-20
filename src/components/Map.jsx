import { useState, useEffect } from 'react'
import axios from "axios"
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet'
import { Icon } from "leaflet"
import kabshp from "../assets/bonebolango.json"
import * as turf from "@turf/turf"

const MyMap = () =>{
  const map = useMap()
  const [myGeoJSON, setMyGeoJSON] = useState(null)
  useEffect(()=>{
    const assignData = (geojson, data) => {
      const geojson_cp = geojson
      geojson_cp.features.map((e)=>{
        // set default properties
        const disease = {
          'Blight':0,
          'Common Rust':0,
          'Gray Leaf Spot':0,
          'Healthy':0
        }
        data.map((el)=>{
          const pt = turf.point([el.Longitude, el.Latitude])
          const poly = turf.polygon(e.geometry.coordinates[0])
          if(turf.booleanPointInPolygon(pt, poly)){
            if(disease.hasOwnProperty(el.Disease)) disease[el.Disease]++
          }
        })
        e.properties.disease = disease
      })
      setMyGeoJSON(geojson_cp)
    }
    axios.get(`${import.meta.env.VITE_APIURL}/location`)
    .then((response) => {
      assignData(kabshp, response.data)
    })
    .catch((error) => {
      console.log(error.response)
    })
  },[])


  const setStyle = (feautre) => {
    return {
      weight: 1,
      fillOpacity: 0.3
    }
  }
  const setLabel = ({properties}, layer) => {
    const popupOptions = {
      minWidth: 100,
      maxWidth: 250,
      className: "popup-classname"
    }
    layer.bindPopup(()=>{
      return `<div class="text-xl fw-bold text-center">
        ${properties.NAMOBJ}
      </div>
      <div class="mt-5 mx-auto">
        <table class="w-full text-center">
          <tr class="border-b">
            <th>Disease</th>
            <th>Num</th>
          </tr>
          <tr class="border-b">
            <td>Northern Corn Leaf Blight</td>
            <td>${properties.disease['Blight']} Case</td>
          </tr>
          <tr class="border-b">
            <td>Common Rust</td>
            <td>${properties.disease['Common Rust']} Case</td>
          </tr>
          <tr class="border-b">
            <td>Gray Leaf Spot</td>
            <td>${properties.disease['Gray Leaf Spot']} Case</td>
          </tr>
        </table>
      </div>
      `
    }, popupOptions)
    layer.bindTooltip(properties.NAMOBJ,{
      permanent: true,
      direction:"center",
      className: 'leaflet-tooltip-own'
    }).openTooltip()
    layer.on({
      mouseover: (e)=>{
        const layer = e.target
        layer.setStyle({
          weight: 5,
          fillOpacity: 0.7
        })
        layer.bringToFront()
      },
      mouseout: (e)=>{
        const layer = e.target
        layer.setStyle({
          weight: 1,
          fillOpacity: 0.3
        })
      },
      click: (e) => map.fitBounds(e.target.getBounds())
    })
  }
  return (
    <>
      {myGeoJSON &&<GeoJSON data={myGeoJSON} style={setStyle} onEachFeature={setLabel} />}
    </>
  )
}

const Map = () => {
  
  return (
    <>
      <section className="relative md:py-24 py-16 bg-white dark:bg-slate-800" id="spread-map">
        <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-6 md:text-2xl text-xl font-medium">Disease Spread Map</h3>
            <p className="text-slate-400 max-w-xl mx-auto">Corn Disease Spread Map Bonebolango, Gorontalo.</p>
          </div>

          <div className="grid grid-cols-1 mt-8 gap-[30px]">
            <div className='w-100 h-96 lg:h-[500px]'>
            {/* 0.5816819125446558, 123.23054680881934 */}
              <MapContainer center={[0.5816819125446558, 123.23054680881934]} zoom={10} scrollWheelZoom={true}>  
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MyMap />
              </MapContainer>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Map