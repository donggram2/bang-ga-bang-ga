import { Router } from "express";
import { loginRequired } from "../middlewares";
import { userService } from "../services";

const usersRouter = Router();

//회원가입
usersRouter.post("/", async (req, res, next) => {
  try {
    const { userName, mobileNumber, email, nickName, password } = req.body;
    const userInfo = {
      userName,
      mobileNumber,
      email,
      nickName,
      password,
    };
    const registerUser = await userService.addUser(userInfo);
    res.status(200).json(registerUser);
  } catch (error) {
    next(error);
  }
});

//로그인
usersRouter.post("/login", async function (req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const Tokens = await userService.getUserToken({ email, password });

    res.status(200).json(Tokens);
  } catch (error) {
    next(error);
  }
});

//유저 정보 조회
usersRouter.get("/", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const getUserIinfo = await userService.getUserById(userId);

    res.status(200).json(getUserIinfo);
  } catch (err) {
    next(err);
  }
});

//회원정보 수정
usersRouter.patch("/:userId", loginRequired, async (req, res, next) => {
  try {
    const {
      role,
      userName,
      mobileNumber,
      email,
      nickName,
      password,
      userIntro,
      gender,
      age,
      mbti,
      preferenceTheme,
      nonPreferenceTheme,
      preferenceLocation,
      escapeScore,
      matchingCount,
      mannerScore,
      profileImg,
    } = req.body;
    const userId = req.params.userId;

    //확인용 패스워드
    const { checkPassword } = req.body;
    if (!checkPassword) {
      throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
    }

    const userInfoRequired = { userId, checkPassword };

    const updateData = {
      ...(role && { role }),
      ...(userName && { userName }),
      ...(mobileNumber && { mobileNumber }),
      ...(userName && { userName }),
      ...(mobileNumber && { mobileNumber }),
      ...(email && { email }),
      ...(nickName && { nickName }),
      ...(nickName && { nickName }),
      ...(password && { password }),
      ...(userIntro && { userIntro }),
      ...(userIntro && { userIntro }),
      ...(gender && { gender }),
      ...(age && { age }),
      ...(mbti && { mbti }),
      ...(preferenceTheme && { preferenceTheme }),
      ...(nonPreferenceTheme && { nonPreferenceTheme }),
      ...(preferenceLocation && { preferenceLocation }),
      ...(matchingCount && { matchingCount }),
      ...(mannerScore && { mannerScore }),
      ...(escapeScore && { escapeScore }),
      ...(profileImg && { profileImg }),
    };
    const updateUserInfo = await userService.updateUser(
      userInfoRequired,
      updateData
    );
    res.status(200).json(updateUserInfo);
  } catch (error) {
    next(error);
  }
});
//회원정보 전체 조회(관리자가 생긴다면,,,?)
// usersRouter.get("/userList", async (req, res, next) => {
//   try {
//     const users = await userService.getUsers();
//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// });

//회원 정보 삭제/탈퇴(update)
usersRouter.delete("/:userId", loginRequired, async (req, res, next) => {
  try {
    const { userId } = req.params;
    await userService.deleteUser(userId);
    res.status(200).json({ message: "회원 삭제 성공" });
  } catch (error) {
    next(error);
  }
});

//비밀번호 찾기(추후 구현)
// usersRouter.post("/tempPassword", async (req, res, next) => {
//   try {
//     const { email } = req.body;
    
//     temporaryPassword = Math.random().toString(36).substring(2, 7);
//     const { userId, temporaryPassword } = userInfo;
//     await userService.updateTempPassword();
//   } catch (error) {
//     next(error);
//   }
// });
export { usersRouter };
