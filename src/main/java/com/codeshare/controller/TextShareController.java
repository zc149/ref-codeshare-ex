package com.codeshare.controller;


import com.codeshare.model.MessageStore;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TextShareController {

    private final MessageStore store;

    @MessageMapping("/send")
    @SendTo("/topic/public")
    public String shareContent(String content) {
        store.setMessage(content);

        return store.getMessage();
    }

}
