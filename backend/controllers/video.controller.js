const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUser() function
// TODO: CRIO_TASK_MODULE_CART - Update function to process url with query params
/**
 * Get user details
 *  - Use service layer to get User data
 * 
 *  - If query param, "q" equals "address", return only the address field of the user
 *  - Else,
 *  - Return the whole user object fetched from Mongo

 *  - If data exists for the provided "userId", return 200 status code and the object
 *  - If data doesn't exist, throw an error using `ApiError` class
 *    - Status code should be "404 NOT FOUND"
 *    - Error message, "User not found"
 *  - If the user whose token is provided and user whose data to be fetched don't match, throw `ApiError`
 *    - Status code should be "403 FORBIDDEN"
 *    - Error message, "User not found"
 *
 * 
 * Request url - <workspace-ip>:8082/v1/users/6010008e6c3477697e8eaba3
 * Response - 
 * {
 *     "walletMoney": 500,
 *     "address": "ADDRESS_NOT_SET",
 *     "_id": "6010008e6c3477697e8eaba3",
 *     "name": "crio-users",
 *     "email": "crio-user@gmail.com",
 *     "password": "criouser123",
 *     "createdAt": "2021-01-26T11:44:14.544Z",
 *     "updatedAt": "2021-01-26T11:44:14.544Z",
 *     "__v": 0
 * }
 * 
 * Request url - <workspace-ip>:8082/v1/users/6010008e6c3477697e8eaba3?q=address
 * Response - 
 * {
 *   "address": "ADDRESS_NOT_SET"
 * }
 * 
 *
 * Example response status codes:
 * HTTP 200 - If request successfully completes
 * HTTP 403 - If request data doesn't match that of authenticated user
 * HTTP 404 - If user entity not found in DB
 * 
 * @returns {Videos}
 *
 */
const getVideos = catchAsync(async (req, res) => {
  // const videoId = req.param;
  // if(videoId){
  //   const video = await videoService.getVideoById(videoId);
  //   res.status(httpStatus.OK).send(video);
  // }
  const {title, genres, contentRating, sortBy} = req.query;
  // console.log('title,genre,contentRating..',title,genres,contentRating);
  let videos;
  if(title && genres && contentRating){
    videos = await videoService.getVideosByTitleAndGenreAndContentRating(title,genres,decodeURIComponent(contentRating));
  }
  else if(title){
    videos = await videoService.getVideosByTitle(title);

  }else if(genres){
    videos = await videoService.getVideosByGenres(genres);
  }else if(contentRating){
    videos = await videoService.getVideosByContentRating(decodeURIComponent(contentRating));
  } else{
    videos = await videoService.getVideos();
  }
  // const queryParam = req.query.q;
  // const { userId } = req.params;
  // let userData;
  // console.log('queryParam..',queryParam);
  // if(queryParam =='address'){
  //   userData = await userService.getUserAddressById(userId);
  //   // const address = {"address":result.address}
  //   // console.log('result from queryParam..',result);
  //   // console.log('req.user.email',req.user.email);
  //   // if(req.user.email != result.email){
  //   //   throw new ApiError(httpStatus.FORBIDDEN, "User doesn't have access")
  //     // res.status(httpStatus.FORBIDDEN);
    
  //   // res.status(httpStatus.OK).send(address);
    
  // }else{
        
    
  //   userData = await userService.getUserById(userId);
    
    
  //   // res.send(result);

  // }
  // if (!userData) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "User not found")
  // }
  // if(req.user.email != userData.email){
  //   throw new ApiError(httpStatus.FORBIDDEN, "User doesn't have access")
  // }
  // if(queryParam =='address'){
  //   const address = {"address":userData.address}
  //   res.status(httpStatus.OK).send(address);
  // }
  // res.send(result);
   
  // res.send(products);
  if(sortBy=='viewCount'){
    videos = await videoService.getVideosByViewCountSorted();
  }else if(sortBy == 'releaseDate'){
    videos = await videoService.getVideosByReleaseDateSorted();
  }
  res.status(httpStatus.OK).send({
    videos: videos,
  });
  // res.send({
  //   address: address,
  // });
});


// module.exports = {
//   getUser,
// });

const setAddress = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (user.email != req.user.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "User not authorized to access this resource"
    );
  }

  const address = await userService.setAddress(user, req.body.address);

  res.send({
    address: address,
  });
});

const createVideo = catchAsync(async (req, res) => {
    // const video = req.body
    const video = await videoService.createVideo(req.body);
  
    if (!video) {
      throw new ApiError(httpStatus.NOT_FOUND, "Video not created");
    }
    // if (user.email != req.user.email) {
    //   throw new ApiError(
    //     httpStatus.FORBIDDEN,
    //     "User not authorized to access this resource"
    //   );
    // }
  
    // const address = await userService.setAddress(user, req.body.address);
  
    res.status(httpStatus.CREATED).send(video);
  });

  const updateVideoVotes = catchAsync(async (req, res) => {
      const { videoId } = req.params;
      const payload = req.body;
  // let userData;
  // console.log('params..',videoId);
  // console.log('paramsurl..',req.url);
    // const video = req.body
    const video = await videoService.updateVideoVotes(videoId, payload);
  
    // if (!video) {
    //   throw new ApiError(httpStatus.NOT_FOUND, "Video not created");
    // }
    // // if (user.email != req.user.email) {
    // //   throw new ApiError(
    // //     httpStatus.FORBIDDEN,
    // //     "User not authorized to access this resource"
    // //   );
    // // }
  
    // // const address = await userService.setAddress(user, req.body.address);
  
    res.status(httpStatus.NO_CONTENT).send(video);
    // res.send({});
  });

  const updateVideoViews = catchAsync(async (req, res) => {
    const { videoId } = req.params;
    // const payload = req.body;
// let userData;
// console.log('params..',videoId);
// console.log('paramsurl..',req.url);
  // const video = req.body
  const video = await videoService.updateVideoViews(videoId);

  // if (!video) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "Video not created");
  // }
  // // if (user.email != req.user.email) {
  // //   throw new ApiError(
  // //     httpStatus.FORBIDDEN,
  // //     "User not authorized to access this resource"
  // //   );
  // // }

  // // const address = await userService.setAddress(user, req.body.address);

  res.status(httpStatus.NO_CONTENT).send(video);
  // res.send({});
});

const getVideoById = catchAsync(async (req, res) => {
  const videoId = req.params.videoId;
  // console.log('req',req.params)
  if(videoId){
    const video = await videoService.getVideoById(videoId);
    res.status(httpStatus.OK).send(video);
  }
  // res.send({});
});


module.exports = {
  // getUser,
  setAddress,
  createVideo,
  getVideos,
  updateVideoVotes,
  updateVideoViews,
  getVideoById
};
