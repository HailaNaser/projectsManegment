import React from 'react'


export default function Footer() {
  return (
    <>
      <>
        {/*Footer container*/}
        <footer className="flex flex-col items-center bg-zinc-50 text-center text-surface  lg:text-left mt-auto w-full">
          {/*Copyright section*/}
          <div
            style={{
              background: "linear-gradient(to right, #FDC830, #F37335)",
            }}
            className="w-full bg-amber-300 p-4 text-center"
          >
            {" "}
            {/* © 2024 Copyright: */}
            <a href="">Copyright © 2024 by Haila Nasser All Right Reserved</a>
          </div>
        </footer>
      </>
    </>
  );
}