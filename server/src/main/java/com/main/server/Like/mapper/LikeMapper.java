package com.main.server.Like.mapper;

import com.main.server.Like.dto.LikeDto;
import com.main.server.Like.entity.Like;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
    public interface LikeMapper {
        // LikeDto -> Like Entity 변환 메소드
        Like likeDtoToLike(LikeDto likeDto);
    }


