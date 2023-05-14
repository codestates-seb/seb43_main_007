package com.main.server.tag.service;

import com.main.server.board.entity.Board;
import com.main.server.tag.entity.Tag;
import com.main.server.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class TagService {
    private final TagRepository tagRepository;

}
