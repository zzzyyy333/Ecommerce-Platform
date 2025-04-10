package com.ecommerce.application.controller.admin;

import com.ecommerce.application.dto.UserBehaviorStats;
import com.ecommerce.application.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class UserAdminController {
    private final UserService userService;

    @GetMapping("/behavior")
    public ResponseEntity<UserBehaviorStats> getUserBehaviorStats(
        @RequestParam String userId,
        @RequestParam(required = false) Integer days
    ) {
        return ResponseEntity.ok(userService.getUserBehaviorStats(userId, days));
    }

    @PostMapping("/{userId}/blacklist")
    public ResponseEntity<Void> addToBlacklist(
        @PathVariable String userId,
        @RequestParam String reason
    ) {
        userService.addToBlacklist(userId, reason);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/blacklist")
    public ResponseEntity<Void> removeFromBlacklist(@PathVariable String userId) {
        userService.removeFromBlacklist(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/blacklist")
    public ResponseEntity<Page<String>> listBlacklist(Pageable pageable) {
        return ResponseEntity.ok(userService.getBlacklistedUsers(pageable));
    }
}