package com.ssafy.db.repository;

import com.ssafy.db.entity.Follow;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Follow findFollowByFollowingUserAndFollowUser(User followingUser, User followUser);
}
