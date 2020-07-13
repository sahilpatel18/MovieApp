import React from "react";
import NavBar from "./NavBar";
import "../index.css";
import Counters from "./Counters";

export default function App() {
  return (
    <>
      <NavBar />
      <main className='container'>
        <Counters />
      </main>
    </>
  );
}
