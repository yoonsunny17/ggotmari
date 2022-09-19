package com.ssafy.db.repository;

import com.ssafy.db.entity.FlowerLike;
import com.ssafy.db.entity.Kind;
import com.ssafy.db.entity.Tag;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlowerLikeRepository extends JpaRepository<FlowerLike, Long> {

    FlowerLike findFlowerLikeByUserAndTagAndKind(User user, Tag tag, Kind kind);

    List<FlowerLike> findAllByUserAndKind(User user, Kind kind);
}
