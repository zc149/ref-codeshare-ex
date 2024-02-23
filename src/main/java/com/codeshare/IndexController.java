package com.codeshare;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequiredArgsConstructor
public class IndexController {

    private final MessageStore store;

    @GetMapping
    public String getIndexPage(Model model) {

        model.addAttribute("message", store.getMessage());

        return "index";
    }
}
