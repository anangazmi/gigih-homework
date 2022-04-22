/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <div className="flex sticky justify-between top-0 px-2 py-2  bg-black  space-x-5">
        <div class="mx-5 my-2">
          <Link to="/home"> Home </Link>
        </div>
        <div class="shrink-0">
          <img
            alt="Photo by aldi sigun on Unsplash"
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            class="mx-auto object-cover rounded-full h-10 w-10 p-0"
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
