package com.main.server.bookmark.controller;

import com.main.server.bookmark.dto.BookmarkDto;
import com.main.server.bookmark.service.BookmarkService;
import com.main.server.comment.dto.CommentDto;
import com.main.server.comment.entity.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
@RequiredArgsConstructor
@RestController
@RequestMapping("/bookmark")
public class BookmarkController {

    private final BookmarkService bookmarkService;
    @PostMapping
    public int postBookmark(@Valid @RequestBody BookmarkDto bookmarkDto) {


        return bookmarkService.updateBookmark(bookmarkDto);

    }
}
