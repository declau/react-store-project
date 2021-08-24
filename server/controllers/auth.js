export const register = (req, res) => {
  console.log(req.body);
  res.send("register user response from controller!!");
  // res.json("register user response from controller!!");
};
