package com.codeshare.controller.textcontroller;

import com.codeshare.model.TextStore;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class IndexController {

    private final TextStore store;

    @GetMapping
    public String getIndexPage() {

        return store.getText();
    }
}
