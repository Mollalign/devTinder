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
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Get you the profile of the other user on platform


Status: ignore, interested, accepted, rejected