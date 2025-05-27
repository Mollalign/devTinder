# DevTinder APIs

## authRouter
- POST /auth/signup
- POST /auth/login
- POST /auth/logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/send/:status/:requestId 


- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Get you the profile of the other user on platform


Status: ignored, interested, accepted, rejected