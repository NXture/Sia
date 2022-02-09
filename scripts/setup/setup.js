import loader from '@/helpers/loader'
import log from '@/helpers/log'

import train from '../train'
import setupDotenv from './setup-dotenv'
import setupCore from './setup-core'
import setupPackagesConfig from './setup-packages-config'
import setupPythonPackages from './setup-python-packages'

// Do not load ".env" file because it is not created yet

/**
 * Main entry to setup Sia
 */
(async () => {
  try {
    // Required env vars to setup
    process.env.SIA_LANG = 'en-US'
    process.env.PIPENV_PIPFILE = 'bridges/python/Pipfile'
    process.env.PIPENV_VENV_IN_PROJECT = 'true'

    await setupDotenv()
    loader.start()
    await Promise.all([
      setupCore(),
      setupPackagesConfig()
    ])
    await setupPythonPackages()
    await train()

    log.default('')
    log.success('Hooray! Sia is installed and ready to go!')
    loader.stop()
  } catch (e) {
    log.error(e)
    loader.stop()
  }
})()
