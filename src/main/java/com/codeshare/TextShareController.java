package com.codeshare;


import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class TextShareController {

    private final MessageStore store;

    @MessageMapping("/send")
    @SendTo("/topic/public")
    public String shareContent(String content){

        store.setMessage(content);

        return content;
    }

}
