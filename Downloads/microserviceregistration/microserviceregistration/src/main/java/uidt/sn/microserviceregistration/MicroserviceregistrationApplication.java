package uidt.sn.microserviceregistration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "uidt.sn.microserviceregistration.client")
public class MicroserviceregistrationApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceregistrationApplication.class, args);
	}

}
