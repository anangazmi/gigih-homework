import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SearchForm from '../form-search/Search';

export default function Header() {
  return (
    <div>
      <div className="flex sticky justify-between top-0 px-2 py-2  bg-black  space-x-5">
        <div class="mx-5 my-2">
          <Link to="/home"> Home </Link>
        </div>
        {/* <div class="mx-5 my-2">
          <SearchForm />
        </div> */}
      </div>
      <Outlet />
    </div>
  );
}
