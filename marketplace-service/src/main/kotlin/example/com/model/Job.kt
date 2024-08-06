package example.com.model

import kotlinx.serialization.Serializable
import java.time.LocalDateTime

@Serializable
data class Job(
    val name: String,
    val description: String,
    val requirements: String,
//    val closeDateTime: LocalDateTime,
)