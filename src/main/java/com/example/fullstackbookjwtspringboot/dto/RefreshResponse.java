package com.example.fullstackbookjwtspringboot.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class RefreshResponse {
    private String accessToken;
    private String refreshToken;
}