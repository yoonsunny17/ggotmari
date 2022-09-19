package com.ssafy.api.service;

import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean checkEmail(String email){
        User user = userRepository.findByEmail(email);
        if(user != null){
            //가입된 유저가 있으면 트루 반환
            return true;
        }else{
            return false;
        }
    }

    public void createUser(String email){
        User user = User.builder()
                .email(email)
                .loginCount(1L)
                .name("랜덤아이디")
                .isActive(true)
                .build();

        userRepository.save(user);
    }

    public void updateLoginCount(String email){
        User user = userRepository.findByEmail(email);
        user.setLoginCount(user.getLoginCount()+1);
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }
}
