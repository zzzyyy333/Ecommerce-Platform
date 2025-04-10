package com.ecommerce.application.controller.admin;

import com.ecommerce.application.entity.Order;
import com.ecommerce.application.service.LogisticsService;
import com.ecommerce.application.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
public class OrderAdminController {
    private final OrderService orderService;
    private final LogisticsService logisticsService;

    @GetMapping
    public ResponseEntity<Page<Order>> listOrders(
        @RequestParam(required = false) String status,
        @RequestParam(required = false) String userId,
        Pageable pageable
    ) {
        return ResponseEntity.ok(orderService.findOrdersByCriteria(status, userId, pageable));
    }

    @PostMapping("/{orderId}/ship")
    public ResponseEntity<Order> shipOrder(
        @PathVariable String orderId,
        @RequestParam String logisticsCompany
    ) {
        Order order = orderService.getOrderById(orderId);
        String trackingNumber = logisticsService.createWaybill(order, logisticsCompany);
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, "SHIPPED", trackingNumber));
    }

    @PostMapping("/{orderId}/cancel")
    public ResponseEntity<Void> cancelOrder(@PathVariable String orderId) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.noContent().build();
    }
}