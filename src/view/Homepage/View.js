import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import { useQuery } from "react-query"

import { loadCourses, loadEnrolleds } from "../../data/api/api"
import { useThisCourse } from '../../data';


const CourseTitle = styled(Link)`
  font-size: 1.1em;
  margin-bottom: 5px;
  display: block;
  text-decoration: none;
`;


export default function Home({props, uuid}) {
  const token = localStorage.getItem('token');

  const { data: coursesData = { results: [] } } = useQuery(
    "results",
    loadCourses
  )
  const { course } = useThisCourse(uuid)

  const allResults = coursesData.results

  //console.log(allResults)


  return (

    <div className='container'> 
    <h2>All Courses</h2>
      {allResults?.map((course, i) => (
        <>

            <div>
              <CourseTitle color="inherit" to={`/courses/${course.uuid}`}>{course.title}</CourseTitle>
              
            </div>
           
            {token ? (
          <Link to={`/courses/${course.uuid}`}>
          <Button variant="contained" color="secondary">
         View Course and Enroll
        </Button>
        </Link>
            ):(
                <Link to="/login">Sign in to Enroll</Link>
            )}
           
            </>
        )
      )}
    
    </div>
  );
}