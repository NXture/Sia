import { langs } from '@@/core/langs.json'
import { version } from '@@/package.json'
import log from '@/helpers/log'

const getInfo = async (fastify, options) => {
  fastify.get(`/${options.apiVersion}/info`, (_request, reply) => {
    log.title('GET /info')

    const message = 'Information pulled.'

    log.success(message)

    reply.send({
      success: true,
      status: 200,
      code: 'info_pulled',
      message,
      after_speech: process.env.SIA_AFTER_SPEECH === 'true',
      logger: process.env.SIA_LOGGER === 'true',
      stt: {
        enabled: process.env.SIA_STT === 'true',
        provider: process.env.SIA_STT_PROVIDER
      },
      tts: {
        enabled: process.env.SIA_TTS === 'true',
        provider: process.env.SIA_TTS_PROVIDER
      },
      lang: langs[process.env.SIA_LANG],
      version
    })
  })
}

export default getInfo
