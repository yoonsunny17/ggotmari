package com.ssafy.api.service;

import com.ssafy.api.request.FollowPostReq;
import com.ssafy.api.request.UserPutReq;
import com.ssafy.api.response.FollowGetFollowerRes;
import com.ssafy.db.entity.Follow;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.FollowRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
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

    public List<FollowGetFollowerRes> getFollowers(String email, String username){

        User loginUser = userRepository.findByEmail(email);
        User targetUser = userRepository.findByName(username);

        List<Follow> loginFollowings = loginUser.getFollowings();
        List<Follow> targetFollowers = targetUser.getFollowers();

        List<FollowGetFollowerRes> followers = new ArrayList<>();
        for(Follow follow : targetFollowers){
            FollowGetFollowerRes follower = new FollowGetFollowerRes();
            follower.setUserImage(follow.getFollowUser().getProfileImage());
            follower.setUserName(follow.getFollowUser().getName());
            if(loginFollowings.contains(follow)){
                follower.setFollowing(true);
            }else{
                follower.setFollowing(false);
            }
            followers.add(follower);
        }

        return followers;
    }

    public List<FollowGetFollowerRes> getFollowings(String email, String username){

        User loginUser = userRepository.findByEmail(email);
        User targetUser = userRepository.findByName(username);

        List<Follow> loginFollowings = loginUser.getFollowings();
        List<Follow> targetFollowings = targetUser.getFollowings();

        List<FollowGetFollowerRes> followings = new ArrayList<>();
        for(Follow follow : targetFollowings){
            FollowGetFollowerRes following = new FollowGetFollowerRes();
            following.setUserImage(follow.getFollowingUser().getProfileImage());
            following.setUserName(follow.getFollowingUser().getName());
            if(loginFollowings.contains(follow)){
                following.setFollowing(true);
            }else{
                following.setFollowing(false);
            }
            followings.add(following);
        }

        return followings;
    }


    public boolean checkFollow(User loginUser, User targetUser){

        if(loginUser.equals(targetUser)){
            return true;
        }

        List<Follow> followings = loginUser.getFollowings();
        for(Follow following : followings){
            if(targetUser.equals(following.getFollowingUser())){
                return true;
            }
        }

        return false;
    }

}
