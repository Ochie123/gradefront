import React, { useEffect } from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode"
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';
import { useQuery } from "react-query";
import { loadCourses, loadEnrolleds, loadCourse } from '../../../../data/api/api'

import { saveClaimsAction } from '../../../../features/auth/authSlice';

const RootPaper = styled(Paper)`
  max-width: 600px;
  margin: auto;
  padding: 10px;
  margin-top: 10px;
`;

const Title = styled(Typography)`
  margin: 10px;
  color: fffff;
  font-size: 1.2em;
`;

const AddButton = styled(Button)`
  float: right;
`;


const ListText = styled(ListItemText)`
  margin-left: 16px;
`;

export default function MyCourses() {

  const { id } = useParams()

  const { data: course } = useQuery(["currentCourse", { id }], () =>
    loadCourse(id)
  )

  const { data = { results: [] }} = useQuery("results", loadCourses);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  //console.log(token);
  const savedClaims = JSON.parse(localStorage.getItem('claims'));
  
  useEffect(() => {
    if (token && !savedClaims) {
      const claims = jwt_decode(token);
      dispatch(saveClaimsAction(claims));
      localStorage.setItem('claims', JSON.stringify(claims));
    }
  }, [token, savedClaims, dispatch]);
 
  let results = data.results.filter((result) => result?.owner_id === savedClaims?.user_id);

  //console.log(results)

  const { data: enrolledsData = { results: [] } } = useQuery("enrolleds", loadEnrolleds);
  const enrolleds = enrolledsData.results;
  
  console.log(enrolleds);
  
  const CourseEnrolleds = enrolleds.filter((user) => user.course === course?.uuid);
  const courseEnrolledsLength = CourseEnrolleds.length;
  
  console.log(CourseEnrolleds);
  return (
    <div>
      <RootPaper elevation={4}>
        <Title variant="h6">
          Your Courses
          <AddButton color="primary" variant="contained" component={Link} to="/create-course">
            New Course
          </AddButton>
        </Title>
        <List dense>
          {results?.map((course, i) => (
            <Link to={`/courses/${course.uuid}`} key={i}>
              <ListItem>
                <ListText primary={course.title} secondary={course.overview} />
             
                {CourseEnrolleds.length}
              </ListItem>
              <Divider />
            </Link>
          ))}
        </List>
      </RootPaper>
    </div>
  );
}