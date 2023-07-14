Backend
Server  ______>Express>MVC ------  Premium packages Check + AuthCkeck __Jwt __0Auth 

CMS 
frontend
blogpost ___post req
coursepost ___post req


backend
admin/login -----> login admin
admin/blog/postblog -----> post req for blog  
admin/course/post course ----->post req for course
blogs/getAllBlogs      [arrayOfBlogs]
blogs/getAllCourses   [arrayOfCourses]

Database 
  |
Schema
  blog
  title : 
  desc :  metadesc + desc 
  content:
  bannerImg : 
  slug:
 Courses
 Course
  title
   desc
   content
   slug
Contact
name
email
describe 

FrontEnd
pages
home   _____   getCourses (premium)   &____getBlogs 
blog  ______getBlogs 
pricing _________
Contact_____ postContact
 Auth ______SignUp/Login + OAuth 

ContextApi or ReduxStore 
getAllNotes 
getAllBlogs
AuthCheck
login /signup
pricing ------