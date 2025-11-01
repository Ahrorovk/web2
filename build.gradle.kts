plugins {
    id("java")
    id("checkstyle")
    id("war")
}

group = "com.ahrorovk"
version = "1"


repositories {
    mavenCentral()
}


dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")

    implementation("org.projectlombok:lombok:1.18.34")
    compileOnly("org.projectlombok:lombok")

    compileOnly("jakarta.servlet:jakarta.servlet-api:6.1.0")
}

tasks.test {
    useJUnitPlatform()
}

tasks.jar {
    manifest {
        attributes(
            "Main-Class" to "com.ahrorovk.server.FcgiServer"
        )
    }
}

tasks.check {
    dependsOn("checkstyleMain")
    dependsOn("checkstyleTest")
}

tasks.war {
    archiveFileName.set("${project.name}.war")
}

tasks.register<Copy>("deployWar") {
    description = "Deploys the WAR file to the WildFly deployments directory."
    dependsOn(tasks.war)
    from(tasks.war.get().archiveFile)
    into("/path/to/wildfly/standalone/deployments")
}