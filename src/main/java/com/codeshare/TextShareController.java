package com.codeshare;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TextShareController {

    @MessageMapping("/send")
    @SendTo("/topic/public")
    public String shareContent(String content){
        return content;
    }

}
