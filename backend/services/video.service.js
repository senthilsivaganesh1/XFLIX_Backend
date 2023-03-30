const { Video } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserById(id)
/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */
 const getUserById = async (id) => {
      const result = await User.findOne({"_id":id});
      // console.log(result,"userById")
      return result;

  }; 


// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserByEmail(email)

/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */
 const getUserByEmail = async (email) => {
    // try {
      const result = await User.findOne({ email });
      // console.log("result..",result);
      if(!result || result==null){
        throw new ApiError(httpStatus.UNAUTHORIZED, "Email not found");
      }
      return result;
    
  }; 

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement createUser(user)

/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "crio-users",
 *  "email": "crio-user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */
 const createVideo = async (video) => {
//   const isEmailTaken = await User.isEmailTaken(user.email);
//   if (isEmailTaken) {
//     throw new ApiError(httpStatus.OK, "Email already taken");
//   } else {
    // const hashedPassword = await bcrypt.hash(user.password, 10);
    // const newDoc = await User.create({ ...user, password: hashedPassword });
    const newDoc = await Video.create(video);
    return newDoc;
//   }
    // if(await User.isEmailTaken(user.email)){

        
    //     throw new ApiError(httpStatus.OK, "\"\"userId\"\" must be a valid mongo id")

    // }
    // if(!user.email){
    //   throw new ApiError(httpStatus.BAD_REQUEST, "\"\"email\"\" email is required")
    // }
    // if(!user.name){
    //   throw new ApiError(httpStatus.BAD_REQUEST, "\"\"name\"\" name is required")
    // }
    // if(!user.password){
    //   throw new ApiError(httpStatus.BAD_REQUEST, "\"\"password\"\" password is required")
    // }
    // const { name, email, password } = user;
    // try {
    //     const { name, email, password } = user;
    //   const newUser = new User({ name, email, password });
    //   const result = await newUser.save();
    //   return result;
    // } catch (error) {
    //   throw error;
    // }
    // const Createduser = await User.create({...user});
    // return Createduser
  };  


// TODO: CRIO_TASK_MODULE_CART - Implement getUserAddressById()
/**
 * Get subset of user's data by id
 * - Should fetch from Mongo only the email and address fields for the user apart from the id
 *
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserAddressById = async (id) => {
  const address = await User.findOne({_id: id}, { address:1, email:1 }); 
  // console.log('address..',address);
  return address;
};


/**
 * Set user's shipping address
 * @param {String} email
 * @returns {String}
 */
const setAddress = async (user, newAddress) => {
  user.address = newAddress;
  await user.save();

  return user.address;
};

/**
 * Fetch all products
 * @returns {Promise<List<Videos>>}
 */
 const getVideos = async () => {
  return await Video.find({});
};

const getVideoById = async (videoId) => {
  console.log('videoId',videoId);
  return await Video.findById(videoId);
};

/* Fetch all products by title
* @returns {Promise<List<Videos>>}
*/
const getVideosByTitle = async (title) => {
 return await Video.find({title:{ $regex: title }});
//  return await Video.find({title:title});
};

const getVideosByGenres = async (genres) => {
  const ans = genres.split(',');
  if(ans.length==1 && ans[0]=='All'){
    return await Video.find({});
  }
  // console.log('ans..',ans)
  const videos = await Video.find({});
  const result = videos.filter((video)=> ans.includes(video.genre));
  return result;
 };

 /* Fetch all products by title
* @returns {Promise<List<Videos>>}
*/
const getVideosByContentRating = async (contentRating) => {
  // const arr = ["7+", "12+", "16+", "18+"];
  // const videos = await Video.find({});
  // let resultArr=[];
  // if(contentRating=="Anyone"){
  //   return videos;  
  // }else{
  //   const index = arr.indexOf(contentRating);
  //   for(let i=0;i<=index;i++){
  //     resultArr.push(arr[i]);
  //   }
  // }
  // const result = videos.filter((video)=> resultArr.includes(video.contentRating));
  // const result = videos.filter((video)=> resultArr.includes(video.contentRating));
  const result =  await Video.find({contentRating:contentRating});
  return result;
 };

const getVideosByTitleAndGenreAndContentRating = async (title,genres,contentRating) => {
  console.log('title..',title)
  let videos, result, titleFiltered;
  // videos = await Video.find({title:{ $regex: title }});
  videos = await Video.find({});

  console.log('videos..',videos)

  titleFiltered = videos.filter((video)=> video.title.toLowerCase().indexOf(title.toLowerCase()!=-1))

  console.log('titleFiltered..',titleFiltered);

  // videos = await Video.find({ title: new RegExp('\\b' + title + '\\b', 'i') });
  const ans = genres.split(',');
  if(ans.length==1 && ans[0]=='All'){     
     result = titleFiltered;
  }else{
    result = titleFiltered.filter((video)=> ans.includes(video.genre));
  }

  console.log('result..',result);
  // // return Video.find({contentRating:contentRating});
  // const arr = ["7+", "12+", "16+", "18+"];
  // let resultArr=[];
  // if(contentRating=="Anyone"){
  //   return videos;  
  // }else{
  //   const index = arr.indexOf(contentRating);
  //   for(let i=0;i<=index;i++){
  //     resultArr.push(arr[i]);
  //   }
  // }
  // return result.filter((video)=> resultArr.includes(video.contentRating));
  console.log('final..',result.filter((video)=> contentRating==video.contentRating));
  return result.filter((video)=> contentRating==video.contentRating);
 }; 

 const getVideosByViewCountSorted = async () => {  
  const result =  await Video.find({});
  console.log('result..',result);
  return result.sort((a, b) => a.viewCount - b.viewCount);
 };

 const getVideosByReleaseDateSorted = async () => {  
  const result =  await Video.find({});
  return result.sort((a, b) => b.releaseDate - a.releaseDate);
 };

 const updateVideoVotes = async (videoId, payload) => {  
  const video =  await Video.findById(videoId);
  const {vote, change} = payload;

  if(vote == 'upVote'){
    if(change == 'increase'){
      video.votes.upVotes = video.votes.upVotes + 1;
    }else if(change== 'decrease'){
      video.votes.upVotes = video.votes.upVotes - 1;
    }
    
  }else if(vote =='downVote'){
    if(change == 'increase'){
      video.votes.downVotes = video.votes.downVotes + 1;
    }else if(change== 'decrease'){
      video.votes.downVotes = video.votes.downVotes - 1;
    }
  }
  

  return await video.save();
 };

 const updateVideoViews = async (videoId) => {  
  const video =  await Video.findById(videoId);
  // const {vote, change} = payload;

  // if(vote == 'upVote'){
  //   if(change == 'increase'){
  //     video.votes.upVotes = video.votes.upVotes + 1;
  //   }else if(change== 'decrease'){
  //     video.votes.upVotes = video.votes.upVotes - 1;
  //   }
    
  // }else if(vote =='downVote'){
  //   if(change == 'increase'){
  //     video.votes.downVotes = video.votes.downVotes + 1;
  //   }else if(change== 'decrease'){
  //     video.votes.downVotes = video.votes.downVotes - 1;
  //   }
  // }

      video.viewCount = video.viewCount + 1;
  

  return await video.save();
 };

module.exports = {
  getUserById,
  getUserByEmail,
  createVideo,
  getUserAddressById,
  setAddress,
  getVideos,
  getVideosByTitle,
  getVideosByGenres,
  getVideosByContentRating,
  getVideosByTitleAndGenreAndContentRating,
  getVideosByViewCountSorted,
  getVideosByReleaseDateSorted,
  updateVideoVotes,
  updateVideoViews,
  getVideoById
};
