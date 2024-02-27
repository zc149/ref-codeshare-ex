package com.codeshare.controller;

import com.codeshare.model.MessageStore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class IndexController {

    private final MessageStore store;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public String getIndexPage() {
//        System.out.println("aa");
        return store.getMessage();
    }
}
