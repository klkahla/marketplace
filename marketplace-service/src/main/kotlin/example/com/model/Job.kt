package example.com.model

import kotlinx.serialization.Serializable

@Serializable
data class Job(
    val description: String,
    val requirements: String,
    val jobDateTime: String,
    val createdAt: String,
)