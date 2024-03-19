"use client";
import "./product.css"
import { Cog6ToothIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
let products = [{
  _id :"1",
  lot: "lot1",
  isim: "isim1"
},
{
  _id :"2",
  lot: "lot2",
  isim: "isim2"
}]
export default function Product() {
  
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/products",{
      method: "GET"
    })
    const data = await res.json()
    if (data){
      setData(data)
      setLoading(false)
    }
    }
    fetchProducts()
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
 
  return (
    <div className="container">
      {data ? (
        <table className="tableid">
          <thead>
            <tr>
              <th>Urun Ismi</th>
              <th>Lot No</th>
              <th>UBB</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product._id}>
                <td>{product.isim}</td>
                <td>{product.lot}</td>
                <td>ubb gelecek</td>
                <td>
                  <button className="btnn" title="Duzenle" onClick={() =>{console.log(String(product._id))}}><Cog6ToothIcon className="imagg" /></button> 
                  <button className="btnn" title="Kaldir" onClick={()=> {console.log(String(product._id))}}><XCircleIcon className="imagg"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        null
      )}
    </div>
  );
}


/*
return (
    <div>
      <table className="tableid">
        <tr>
              <th>Urun Ismi</th>
              <th>Urun Lot</th>
              <th>Urun UBB</th>
              <th>Aksiyon</th>
            </tr>
      {products ?(
        products.map(product => (
          <>
            <tr key={product._id}>
              <td>{product.isim}</td>
              <td>{product.lot}</td>
              <td>UBB Gelecek</td>
              <td><button onClick={() =>{
              console.log(String(product._id))
            }}>Edit</button> <button onClick={()=> {
              console.log(String(product._id))
            }}>Remove</button></td>
            </tr>
          </>
        ))
      ):(<td>Herhangi bir urun bilgisine ulasilamadi.</td>)}
      </table>
    </div>
  )
*/