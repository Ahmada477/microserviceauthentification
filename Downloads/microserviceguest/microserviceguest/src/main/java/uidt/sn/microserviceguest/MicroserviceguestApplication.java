package uidt.sn.microserviceguest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MicroserviceguestApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceguestApplication.class, args);
	}

}
