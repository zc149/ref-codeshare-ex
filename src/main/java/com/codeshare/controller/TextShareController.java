package com.codeshare.controller;


import com.codeshare.model.MessageStore;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@RequiredArgsConstructor
public class TextShareController {

    private final MessageStore store;

    @MessageMapping("/send")
    @SendTo("/topic/public")
    @CrossOrigin(origins = "http://localhost:5173")
    public String shareContent(String content){
        System.out.println("ss");
        store.setMessage(content);

        return content;
    }

}
