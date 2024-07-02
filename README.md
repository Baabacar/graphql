# GraphQL

## Overview

This project involves creating a personalized profile page using the GraphQL API provided by Zone01 Dakar platform.

## Objective

The main goal is to learn and implement the GraphQL query language by building a user interface that displays your own student data.

## Features

- Secure login page (username/password or email/password)
- Display of at least 3 information sections of your choice, such as:
  - Basic user identification
  - Total XP amount
  - Grades
  - Audits
  - Skills
- Mandatory section of statistical graphs generated using SVG
- At least 2 different types of graphs (e.g., XP progression, audit ratio, etc.)
- Logout functionality

## Technologies Used

- GraphQL for data queries
- JWT for authentication
- SVG for graph generation
- HTML/CSS/JavaScript for the user interface


<br>

<p align="center">
<img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=&color=black">
<img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=purple&color=black">

<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=yellow&color=black">
<img alt="Jwt" src="https://img.shields.io/badge/jwt-%23000000.svg?&style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)">
<img alt="Graphql" src="https://img.shields.io/badge/graphql-%23E10098.svg?&style=for-the-badge&logo=graphql&logoColor=white">


<br>

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser
3. Log in with your Zone01 credentials
4. Explore your profile and statistics!

## Hosting

This project is hosted on [here](https://graphql-bababoom.vercel.app).

## GraphQL Queries

The project utilizes various GraphQL queries to fetch data from tables such as:

- user
- transaction
- progress
- result
- object

Examples of queries used:

```graphql
{
  user {
    id
    login
  }
}

{
  object(where: { id: { _eq: 3323 }}) {
    name
    type
  }
}

{
  result {
    id
    user {
      id
      login
    }
  }
}