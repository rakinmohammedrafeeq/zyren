# Getting Started

### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/3.5.7/maven-plugin)
* [Create an OCI image](https://docs.spring.io/spring-boot/3.5.7/maven-plugin/build-image.html)
* [Validation](https://docs.spring.io/spring-boot/3.5.7/reference/io/validation.html)
* [Spring Security](https://docs.spring.io/spring-boot/3.5.7/reference/web/spring-security.html)
* [Spring Data JPA](https://docs.spring.io/spring-boot/3.5.7/reference/data/sql.html#data.sql.jpa-and-spring-data)
* [Spring Web](https://docs.spring.io/spring-boot/3.5.7/reference/web/servlet.html)

### Guides
The following guides illustrate how to use some features concretely:

* [Validation](https://spring.io/guides/gs/validating-form-input/)
* [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
* [Spring Boot and OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
* [Authenticating a User with LDAP](https://spring.io/guides/gs/authenticating-ldap/)
* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)

### External APIs & Services

* [Groq API Documentation](https://console.groq.com/docs/quickstart) - Fast AI inference for text and vision
* [Google Gemini API](https://ai.google.dev/docs) - Multimodal AI models
* [Cloudinary Documentation](https://cloudinary.com/documentation) - Media management and storage
* [Resend API Documentation](https://resend.com/docs) - Email delivery service

### Maven Parent overrides

Due to Maven's design, elements are inherited from the parent POM to the project POM.
While most of the inheritance is fine, it also inherits unwanted elements like `<license>` and `<developers>` from the parent.
To prevent this, the project POM contains empty overrides for these elements.
If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.

### AI Configuration

Zyren uses a multi-provider AI system for enhanced reliability:

**Primary Provider: Groq**
- Fast text processing with LLaMA 3.3 70B
- Vision capabilities with LLaMA 4 Maverick 17B
- Used for: title generation, summarization, chat

**Fallback Provider: Google Gemini**
- Multiple Flash models (3.6, 3.5, 3.5-lite, 3.1-lite, 3, 2.5)
- Vision support for images, PDFs, videos
- Automatic model fallback on rate limits

**Configuration:**
Set API keys in environment variables or `.env`:
```
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
```

Optional model configuration:
```
GROQ_TEXT_MODEL=llama-3.3-70b-versatile
GROQ_VISION_MODEL=meta-llama/llama-4-maverick-17b-128e-instruct
GEMINI_VISION_PRIMARY=gemini-3.6-flash
GEMINI_TEXT_PRIMARY=gemini-3.5-flash-lite
```

