package com.codeshare.controller.textcontroller;


import com.codeshare.model.TextStore;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TextShareController {

    private final TextStore store;

    @MessageMapping("/send")
    @SendTo("/topic/public")
    public String shareContent(String content) {
        store.setText(content);

        return store.getText();
    }

}
