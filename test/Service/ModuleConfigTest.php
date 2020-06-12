<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\Test\Service;

use PHPUnit\Framework\TestCase;
use PostDirekt\Autocomplete\Service\ModuleConfig;
use Shopware\Core\System\SystemConfig\SystemConfigService;

class ModuleConfigTest extends TestCase
{
    /** @var ModuleConfig */
    private $subject;

    protected function setUp(): void
    {
        $systemConfigMock = $this->getMockBuilder(SystemConfigService::class)
                                 ->disableOriginalConstructor()
                                 ->onlyMethods(['get'])
                                 ->getMock();
        $systemConfigMock->method('get')
                         ->willReturnArgument(0);
        /** @var SystemConfigService $systemConfigMock */
        $this->subject = new ModuleConfig($systemConfigMock);
        parent::setUp();
    }

    public function testIsActive(): void
    {
        static::assertTrue($this->subject->isActive());
    }

    public function testGetApiUser(): void
    {
        static::assertEquals('NRLEJPostDirektAutocomplete.config.apiUser', $this->subject->getApiUser());
    }

    public function testGetApiPassword(): void
    {
        static::assertEquals('NRLEJPostDirektAutocomplete.config.apiPassword', $this->subject->getApiPassword());
    }
}
