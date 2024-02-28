package com.codeshare.controller.chatcontroller;

import com.codeshare.model.MessageStore;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {
    private final MessageStore messageStore;

    @MessageMapping("/send2")
    @SendTo("/topic/public2")
    public String shareContent(String message){
        messageStore.setMessage(message);

        return messageStore.getMessage();
    }

}
