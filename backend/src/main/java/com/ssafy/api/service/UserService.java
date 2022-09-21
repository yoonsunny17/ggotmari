package com.ssafy.api.service;

import com.ssafy.api.request.FollowPostReq;
import com.ssafy.api.request.UserPutReq;
import com.ssafy.db.entity.Follow;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.FollowRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FollowRepository followRepository;
    @Autowired
    private FileService fileService;

    public boolean checkEmail(String email){
        User user = userRepository.findByEmail(email);
        if(user != null){
            //가입된 유저가 있으면 트루 반환
            return true;
        }else{
            return false;
        }
    }

    @Transactional
    public void createUser(String email){
        User user = User.builder()
                .email(email)
                .loginCount(1L)
                .name("랜덤아이디")
                .profileImage("")
                .isActive(true)
                .build();

        userRepository.save(user);
    }

    @Transactional
    public void updateLoginCount(String email){
        User user = userRepository.findByEmail(email);
        user.setLoginCount(user.getLoginCount()+1);
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User getUserByName(String name){
        return userRepository.findByName(name);
    }

    @Transactional
    public boolean reverseFollow(FollowPostReq followPostReq, User loginUser) {
        User user = userRepository.findByName(followPostReq.getUserName());

        if(user == null){
            return false;
        }

        if(followPostReq.isFollow()){
            if(followRepository.findFollowByFollowingUserAndFollowUser(user, loginUser) != null){
                return false;
            }

            Follow follow = new Follow();
            follow.setFollowingUser(user);
            follow.setFollowUser(loginUser);

            followRepository.save(follow);

            loginUser.getFollowings().add(follow);
            user.getFollowers().add(follow);

        }else{
            Follow follow = followRepository.findFollowByFollowingUserAndFollowUser(user, loginUser);

            if(follow == null){
                return false;
            }

            followRepository.delete(follow);

            loginUser.getFollowings().remove(follow);
            user.getFollowers().remove(follow);
        }

        return true;
    }

    @Transactional
    public boolean updateUser(UserPutReq userPutReq, String email, MultipartFile multipartFile) {
        User user = userRepository.findByEmail(email);

        if(userPutReq.getUserName() != null){
            user.setName(userPutReq.getUserName());
        }
        if(multipartFile != null){
            String imageUrl = fileService.uploadFile(multipartFile);
            user.setProfileImage(imageUrl);
        }
        if(userPutReq.getBirthday() != null) {
            user.setBirthday(userPutReq.getBirthday());
        }
        user.setSex(userPutReq.isSex());

        return true;
    }

    @Transactional
    public boolean deleteUser(String email) {
        User user = userRepository.findByEmail(email);

        if(user == null){
            return false;
        }

        user.setEmail("deleteUser" + user.getId());

        return true;
    }
}
