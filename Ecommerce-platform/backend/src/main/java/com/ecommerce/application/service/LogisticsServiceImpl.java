package com.ecommerce.application.service;

import com.ecommerce.application.entity.Order;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LogisticsServiceImpl implements LogisticsService {
    @Value("${logistics.kdniao.ebusiness-id}")
    private String eBusinessID;

    @Value("${logistics.kdniao.app-key}")
    private String appKey;

    private final RestTemplate restTemplate;

    public LogisticsServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public String createWaybill(Order order, String logisticsCompany) {
        // 调用快递鸟电子面单API
        String requestData = buildRequestData(order, logisticsCompany);
        String dataSign = encryptRequestData(requestData);

        // 发送API请求并处理响应
        String response = restTemplate.postForObject(
            "https://api.kdniao.com/api/EOrderService",
            buildRequestEntity(requestData, dataSign),
            String.class
        );

        return parseTrackingNumber(response);
    }

    private String buildRequestData(Order order, String companyCode) {
        return String.format("{\"ShipperCode\":\"%s\",\"OrderCode\":\"%s\"," +
            "\"PayType\":1,\"ExpType\":1,\"Sender\":{...},\"Receiver\":{...}}",
            companyCode, order.getId());
    }

    private String encryptRequestData(String requestData) {
        // 实现快递鸟签名算法
        return "...";
    }

    private String parseTrackingNumber(String response) {
        // 解析API响应获取运单号
        return "SF123456789";
    }
}