import * as React from 'react';
import {  Button } from '@mui/material';
import { Link} from "react-router-dom";

import { SvgIcon,

} from "@mui/material"
import { PlusCircle as PlusCircleIcon} from "react-feather"


import { useMediaQuery } from "@mui/material"


function ResponsiveAppBar() {
  const token = localStorage.getItem('token');

  const mobileDevice = useMediaQuery('(max-width:650px)');

  const handleLogout = () => {
    localStorage.clear();
  };



  return (
    <nav className="navbar navbar-expand-lg blur border-radius-sm top-0 z-index-3 shadow position-sticky py-3 start-0 end-0 bg-blue">

      <div className="container px-1">

        <div className="navbar-brand font-weight-bolder ms-lg-0 ">  <Link to={"/"}> Gradeking</Link>  </div>
  

          {token ? (
            <>
                          <span>
  
                <Link to="/create-course">
        
        <Button
          color="primary"
          variant="contained"
          className=""
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
         Create course
        </Button>
     
                </Link>
           
              <Link to={`/my-enrollments`}>
                <Button color="inherit">
                  
                  My Courses
                </Button>
              </Link>
              <a className='' href="/">
              <Button
                color="inherit"
                onClick={handleLogout}
              >
                Sign out
              </Button>
              </a>
            </span>
            </>
          ):(
            <div className="" id="">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            <div className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 " aria-current="page" href="" rel="nofollow" target="_blank">
            <Link to={"/login"}>Login</Link>
            </div>
          </li>
          </ul>
        </div>
          )}
   
      </div>
    </nav>
  );
}
export default ResponsiveAppBar;